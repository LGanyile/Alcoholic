import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
    
  } from "@firebase/rules-unit-testing";

  import { readFileSync } from 'fs';
  
  import {
    collection,
    addDoc,
    doc,
    getDoc,
    setDoc,
    getDocs,
    or,
    query,
    where
  } from "firebase/firestore";
  


const firebase = require('@firebase/rules-unit-testing'); 

const MY_PROJECT_ID = 'alcoholic-sample-test';
const myId = 'userId123';
const theirId = 'userId456';
const myAuth = {
    uid:myId, 
    email: 'ideasgivedirection@gmail.com',
    isOwner: false,
    isAdmin: false,
};

const user1Auth = {uid:'user1UID', email: 'user1@gmail.com'};
const user2Auth = {uid:'user2UID', email: 'user2@gmail.com'};
const conversation = {
    'conversationId': 'someConversationId',
    'user1Id': user1Auth.uid,
    'user2Id': user2Auth.uid,
};

const storeOwner = {
    auth: {uid:'owner1UID', email: 'admin1@gmail.com', 'isOwner': true}
};

const admin = {
    auth: {uid:'admin1UID', email: 'admin1@gmail.com', 'isAdmin': true}
};

const store = {
    'storeId': 'store123',
    'storeName': 'Kwa Nkuxa',
    'storeImageLocation': '../pic.jpg',
    'sectionName': 'Umlazi AA',
    'storeOwner': storeOwner,
};

function getFirestore(auth){
    return firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth: auth}).firestore();
}

function getAdmiFirestore(){
    return firebase.initializeAdmiApp({projectId: MY_PROJECT_ID}).firestore();
}

beforeEach(async()=>{
    await firebase.clearFirestoreData({projectId:MY_PROJECT_ID});
});

// ====================================================================

let testEnv;
let unauthenticatedAccess;
  
let authenticatedAccess;
let database;

// ====================================================================


describe('Our Alcoholic App',()=>{

    beforeEach(async () => {
        
        testEnv = await initializeTestEnvironment({
          projectId: "alcoholic-idea",
          firestore: {
            rules: readFileSync("firestore.rules", "utf8"),
              host: "127.0.0.1",
              port: "8080"
          },
        });
        
        //unauthenticatedAccess = testEnv.unauthenticatedContext().firestore();
        unauthenticatedAccess = testEnv.unauthenticatedContext();
        authenticatedAccess = testEnv.authenticatedContext(myId);
        //database = authenticatedAccess.firestore();
        
     });
          
      afterEach(async () => {
        
        //await testEnv.cleanup();
        await testEnv.clearFirestore();
        
      });

    // Testing /recent_wins/{recentWinId} 
    it('Allow anybody to view recent wins.', async()=>{

        database =   unauthenticatedAccess.firestore();
        const testDoc = doc(database, '/recent_wins/recentWinId');
        await assertSucceeds(getDoc(testDoc));
    }); // Working As Expected.

    // Testing /won_prices_summaries/{wonPriceSummaryId}
    it('Allow anybody to view won price summaries.', async()=>{

        database =   unauthenticatedAccess.firestore();
        const testDoc = doc(database, '/won_prices_summaries/wonPriceSummaryId');
        await assertSucceeds(getDoc(testDoc));
    }); // Working As Expected.

    // Testing /won_prices_summaries/{wonPriceSummaryId}/beg_requests/{begRequestId}
    it('Do not allow not logged in users to beg other user.', async()=>{

        database =   unauthenticatedAccess.firestore();
        const begRequests = collection(database, '/won_prices_summaries/wonPriceSummaryId/beg_requests/');
        await assertFails(addDoc(begRequests, {someData:'anything'}));
    }); // Working As Expected.

    // Testing /won_prices_summaries/{wonPriceSummaryId}/beg_requests/{begRequestId}
    it('Allow logged in users to beg other user.', async()=>{

        database =   authenticatedAccess.firestore();
        const begRequests = collection(database, '/won_prices_summaries/wonPriceSummaryId/beg_requests/');
        await assertSucceeds(addDoc(begRequests, {someData:'anything'}));
    }); // Working As Expected.
    
    // Testing /found_alcohol/{foundAlcoholId}
    it('Allow anybody to search for alcohol.', async()=>{
    
        database =   unauthenticatedAccess.firestore();
        const testDoc = doc(database, '/found_alcohol/foundAlcoholId');
        await assertSucceeds(getDoc(testDoc));
     }); // Working As Expected.

    // Testing /found_stores_with_competition/{foundStoresWithCompetitionId}
    it('Allow anybody to search for stores with competitions.', async()=>{

        database =   unauthenticatedAccess.firestore();
          const testCollection = collection(database, '/found_stores_with_competition/');
          await assertSucceeds(getDocs(testCollection));
      }); // Working As Expected.

    // Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
    it('Do not allow users to see grand prices not corresponding to a found store with competition that they are currently viewing.', async()=>{

        database =   unauthenticatedAccess.firestore();
        let storeId = 'someId';
        const testCollecgtion = collection(database, '/found_stores_with_competition/' + storeId + '/found_grand_prices');
            const foundStoresQuery = query(
                testCollecgtion,
                where("owningStoreFK", "==", 'kkk')
                
            );
    
        // returns a promise, chain appropriately
        assertFails(getDocs(foundStoresQuery));
    }); // Acting Wierd

    // Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
it('Allow users to see grand prices corresponding to a found store with competition that they are currently viewing.', async()=>{

    database =   unauthenticatedAccess.firestore();
    let storeId = 'someId';
    const testCollecgtion = collection(database, '/found_stores_with_competition/' + storeId + '/found_grand_prices');
          const foundStoresQuery = query(
            testCollecgtion,
            where("owningStoreFK", "==", storeId)
            
          );
  
          // returns a promise, chain appropriately
          assertSucceeds(getDocs(foundStoresQuery));
  }); // Acting Wierd
    
      // Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
      it('Allow anybody to search for stores with competitions and only  see the corresponding grand prices.', async()=>{

        const database = getFirestore(null);
        const testDoc = database.collection('/found_stores_with_competition/foundStoresWithCompetitionXYZId/found_grand_prices').doc('foundGrandPriceXYZId');
        await firebase.assertSucceeds(testDoc.get());
      }); // Make User Of The 'where' clause.

    // Testing /found_stores_with_winner/{foundStoresWithWinnerId}
    it('Allow anybody to search for stores with winner.', async()=>{

        const database = getFirestore(null);
        const testDoc = database.collection('/found_stores_with_winner/').doc('foundStoresWithWinnerXYZId');
        await firebase.assertSucceeds(testDoc.get());
    });
    
    // Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
    it('Allow anybody to search for stores without competitions.', async()=>{

        const database = getFirestore(null);
        const testDoc = database.collection('/found_stores_without_competition/').doc('foundStoresWithoutCompetitionXYZId');
        await firebase.assertSucceeds(testDoc.get());
    });
    
    // Testing /all_alcohol/{alcoholId}
    
    // Testing /all_alcohol/{alcoholType}
    
    // Testing /all_alcohol/{alcoholName}
    
    // Testing /available_alcohol/{alcoholId}
    
    // Testing /available_alcohol/{alcoholType}
    
    // Testing /available_alcohol/{alcoholName}
    
    // Testing /all_locations/{locationId}
    
    // Testing /all_locations/{sectionName}
    
    // Testing /available_locations/{locationId}
    
    // Testing /available_locations/{sectionName}
    
    // Testing /found_stores/{storeId}
    
    // Testing /found_stores/{storeName}
    
    // Testing /found_stores/{suburbName}
    
    // Testing /competitions/{restOfPath=**}
    
    // Testing /competitions/{restOfPath=**}/grand_prices_grid/{grandPriceGridId}
    
    // Testing /competitions/{restOfPath=**}/grand_prices_grid/{grandPriceGridId}/grand_price_tokens/{grandPriceTokenId}
    
    // Testing /competitions/{restOfPath=**}/competitors_grid/{competitorGridId}
    
    // Testing /competitions/{restOfPath=**}/competitors_grid/{competitorGridId}/competitors_tokens/{competitorTokenId}
   
    // Testing /stores_names_info/{storeNameInfoId}
    
    // Testing /stores_names_info/storeNameInfoId/stores_groups/{storeGroupId}
    
    // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_stores_posts/{restOfPath=**}
    it('Allow anybody to read a future store post.', async()=>{

        const database = getFirestore(null);
        const testDoc = database.collection('/stores_names_info/storeNameInfoXYZId/'
        + 'stores_groups/storeGroupXYZId/future_stores_posts/').doc('storePostXYZId');
        await firebase.assertSucceeds(testDoc.get());
    });

    it('Don\'t allow non future post creators to edit a post.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/stores_names_info/storeNameInfoXYZId/'
        + 'stores_groups/storeGroupXYZId/future_stores_posts/').where('creatorUserId', 
        '==', theirId);
        await firebase.assertFails(testDoc.set({text:'new text'}));
    });

    it('Only allow future post creators to edit their store post.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/stores_names_info/storeNameInfoXYZId/'
        + 'stores_groups/storeGroupXYZId/future_stores_posts/').where('creatorUserId', 
        '==', myId);
        await firebase.assertSucceeds(testDoc.set({text:'new text'}));
    });

    // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_stores_posts/storePostId/store_post_involved_users/{involvedUserId}

    // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_stores_posts/storePostId/comments/{commentId}
    
    // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_stores_posts/{restOfPath=**}
    it('Allow anybody to read a future store post.', async()=>{

        const database = getFirestore(null);
        const testDoc = database.collection('/stores_names_info/storeNameInfoXYZId/'
        + 'stores_groups/storeGroupXYZId/past_stores_posts/').doc('storePostXYZId');
        await firebase.assertSucceeds(testDoc.get());
    });

    it('Don\'t allow non past post creators to edit a post.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/stores_names_info/storeNameInfoXYZId/'
        + 'stores_groups/storeGroupXYZId/past_stores_posts/').where('creatorUserId', 
        '==', theirId);
        await firebase.assertFails(testDoc.set({text:'new text'}));
    });

    it('Only allow past post creators to edit their store post.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/stores_names_info/storeNameInfoXYZId/'
        + 'stores_groups/storeGroupXYZId/past_stores_posts/').where('creatorUserId', 
        '==', myId);
        await firebase.assertSucceeds(testDoc.set({text:'new text'}));
    });

    // Testing /stores_names_info/{storeNameInfoId}/stores_groups/storeGroupId/past_stores_posts/storePostId/store_post_involved_users/{involvedUserId}

    // Testing /stores_names_info/{storeNameInfoId}/stores_groups/storeGroupId/past_stores_posts/storePostId/comments/{commentId}
    


    // Testing /stores/storeId
    it('Can\'t read store information if you are neither an owner nor an admin.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/stores/').doc;
        await firebase.assertFails(testDoc.get());
    });

    // Testing /stores/storeId
    it('Can read store information if you are an owner.', async()=>{

        const database = getFirestore(storeOwner.auth);
        const testDoc = database.collection('/stores/').doc;
        await firebase.assertSucceeds(testDoc.get());
    });

    // Testing /stores/storeId
    it('Can read store information if you are an admin.', async()=>{

        const database = getFirestore(admin.auth);
        const testDoc = database.collection('/stores/').doc;
        await firebase.assertSucceeds(testDoc.get());
    });
    
    // Testing /stores/{storeId}/store_joined_members/{userId}
    
    // Testing /stores/{storeId}/store_competitions/{storeCompetitionId}
    // I don't understand why this query fails.
    it('Can\'t query all store competitions.', async()=>{

        const database = getFirestore(null);
        const testDoc = database.collection('/stores/storeId/store_competitions/');
        await firebase.assertFails(testDoc.get());
    });
    
    // Testing /stores/{storeId}/store_alcohol/{storeAlcoholId}
    
    // Testing /users/{userId}
    
    // Testing /users/{userId}/people_who_know_you/{alcoholicToBeId}
    it('Does not allow users to view another user\'s people who know you.', async()=>{

        const database = getFirestore(myAuth);

        const testDoc = database.collection('/users/' + theirId + '/people_who_know_you/').doc('alcoholicToBeIdXYZ');
        await firebase.assertFails(testDoc.get());
    });

    it('Only allow users to view their own people who know you.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/users/' + myId + '/people_who_know_you/').doc('alcoholicToBeIdXYZ');
        await firebase.assertSucceeds(testDoc.get());
    });

    it('Does not allow users to edit other user\'s people who know you.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/users/' + theirId + '/people_who_know_you/').doc('alcoholicToBeXYZ');
        await firebase.assertFails(testDoc.set({isKnown: false}));
    });

    it('Only allow users to edit their own people who know you.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/users/' + myId + '/people_who_know_you/').doc('alcoholicToBeXY');
        await firebase.assertSucceeds(testDoc.set({isKnown: false}));
    });

    it('Does not allow not logged in users to remove their people who know you users.', async()=>{

        const database = getFirestore(null);
        const testDoc = database.collection('/users/' + myId + '/people_who_know_you/').doc('alcoholicToBeXYZ');
        await firebase.assertFails(testDoc.delete());
    });

    it('Does not allow users to remove other user\'s people who know you.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/users/' + theirId + '/people_who_know_you/').doc('alcoholicToBeXYZ');
        await firebase.assertFails(testDoc.delete());
    });

    it('Only allow users to remove their own people who know you.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/users/' + myId + '/people_who_know_you/').doc('alcoholicToBeXY');
        await firebase.assertSucceeds(testDoc.delete());
    });
    
    
    // Testing /users/userId/conversations
    it('Does not allow not logged in users  to read a conversation.', async()=>{
        
        const database = getFirestore(null);
        const testDoc = database.collection('/users/' + conversation.user1Id +
        '/conversations/' + conversation.conversationId +'/messages/').doc('someMessageId');
        await firebase.assertFails(testDoc.get());
    });

    it('Does not allow users who aren\'t part of a conversation to read it.', async()=>{

        const database = getFirestore(user1Auth);
        const testDoc = database.collection('/users/' + conversation.user2Id +
        '/conversations/' + conversation.conversationId +'/messages/')
        .doc('someMessageId');
        await firebase.assertFails(testDoc.get());
    });

    it('Allow the first conversation participant to read it.', async()=>{

        const database = getFirestore(user1Auth);
        const testDoc = database.collection('/users/' + conversation.user1Id + 
        '/conversations/' + conversation.conversationId + '/messages/')
        .doc('someMessageId');
        await firebase.assertSucceeds(testDoc.get());
    });

    it('Allow the second conversation participant to read it.', async()=>{

        const database = getFirestore(user2Auth);
        const testDoc = database.collection('/users/' + conversation.user2Id + 
        '/conversations/' + conversation.conversationId + '/messages/')
        .doc('someMessageId');
        await firebase.assertSucceeds(testDoc.get());
    });

    // Testing /users/userId/conversations/conversationId/messages
    it('Does not allow not logged in users  to read a message.', async()=>{
        
        const database = getFirestore(null);
        const testDoc = database.collection('/users/' + conversation.user1Id +
        '/conversations/' + conversation.conversationId +'/messages/').doc('someMessageId');
        await firebase.assertFails(testDoc.get());
    });

    it('Does not allow users who aren\'t part of a conversation to read it message.', async()=>{

        const database = getFirestore(user1Auth);
        const testDoc = database.collection('/users/' + conversation.user2Id +
        '/conversations/' + conversation.conversationId +'/ messages/')
        .doc('someMessageId');
        await firebase.assertFails(testDoc.get());
    });

    it('Allow the first conversation participant to read it message.', async()=>{

        const database = getFirestore(user1Auth);
        const testDoc = database.collection('/users/' + conversation.user1Id + 
        '/conversations/' + conversation.conversationId + '/messages/')
        .doc('someMessageId');
        await firebase.assertSucceeds(testDoc.get());
    });

    it('Allow the second conversation participant to read it message.', async()=>{

        const database = getFirestore(user2Auth);
        const testDoc = database.collection('/users/' + conversation.user2Id + 
        '/conversations/' + conversation.conversationId + '/messages/')
        .doc('someMessageId');
        await firebase.assertSucceeds(testDoc.get());
    });

    it('Do not allow any user to edit a message that wasn\'t created by him/her.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/users/' + myId + 
        '/conversations/' + conversation.conversationId + '/messages/')
        .doc('someMessageId');
        await firebase.assertFails(testDoc.set({text:'new text'}));
    });

    it('Allow a conversation participant to edit a message that was created by him/her.', async()=>{

        const database = getFirestore(user1Auth);
        const testDoc = database.collection('/users/' + conversation.user1Id + 
        '/conversations/' + conversation.conversationId + '/messages/')
        .doc('someMessageId');
        await firebase.assertSucceeds(testDoc.set({text:'new text'}));
    });

    it('Don\'t allow a conversation participant to edit a message that wasn\'t created by him/her.', async()=>{

        const database = getFirestore(user1Auth);
        const testDoc = database.collection('/users/' + conversation.user2Id + 
        '/conversations/' + conversation.conversationId + '/messages/')
        .doc('someMessageId');
        await firebase.assertFails(testDoc.set({text:'new text'}));
    });
    
    // Testing /users/userId/my_stores_owners/storeOwnerId
    it('Does not allow users to view another user\'s store owners.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/users/' + theirId + '/my_store_owners/').doc('storeOwnerIdXYZ');
        await firebase.assertFails(testDoc.get());
    });

    it('Only allow users to view their own store owners.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/users/' + myId + '/my_store_owners/').doc('storeOwnerIdXYZ');
        await firebase.assertSucceeds(testDoc.get());
    });

    it('Does not allow not logged in users to remove store owners.', async()=>{

        const database = getFirestore(null);
        const testDoc = database.collection('/users/' + myId + '/my_store_owners/').doc('storeOwnerId');
        await firebase.assertFails(testDoc.delete());
    });

    it('Does not allow users to remove other user\'s store owners.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/users/' + theirId + '/my_store_owners/').doc('storeOwnerId');
        await firebase.assertFails(testDoc.delete());
    });

    it('Only allow users to remove their own store owners.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/users/' + myId + '/my_store_owners/').doc('storeOwnerId');
        await firebase.assertSucceeds(testDoc.delete());
    });

    // Testing /users/userId/beg_requests_summaries/begRequestId
    it('Does not allow users to  view beg request not belonging to them.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/users/' + theirId + '/beg_requests_summaries/').doc('begRequestXYZ');
        await firebase.assertFails(testDoc.get());
    });

    it('Only allow users to view their own beg requests.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/users/' + myId + '/beg_requests_summaries/').doc('begRequestXYZ');
        await firebase.assertSucceeds(testDoc.get());
    });

    it('Does not allow users to respond to beg request not belonging to them.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/users/' + theirId + '/beg_requests_summaries/').doc('begRequestXYZ');
        await firebase.assertFails(testDoc.set({isAccepted: false}));
    });

    it('Only allow users to edit their own beg requests.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/users/' + myId + '/beg_requests_summaries/').doc('begRequestXYZ');
        await firebase.assertSucceeds(testDoc.set({isAccepted: false}));
    });
    
    // Testing /users/userId/my_alcoholics/alcoholicId
    it('Does not allow users to  view other user\'s alcoholics.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/users/' + theirId + '/my_alcoholic/').doc('alcoholicIdXYZ');
        await firebase.assertFails(testDoc.get());
    });

    it('Only allow users to view their own alcoholics.', async()=>{

        const database = getFirestore(myAuth);
        const testDoc = database.collection('/users/' + myId + '/my_alcoholic/').doc('alcoholicIdXYZ');
        await firebase.assertSucceeds(testDoc.get());
    });


})