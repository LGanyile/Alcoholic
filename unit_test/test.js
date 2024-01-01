import { readFileSync } from 'fs';
import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
    
  } from "@firebase/rules-unit-testing";



const PROJECT_ID = 'alcoholic-idea';

const myId = 'user_abc';
const myUserData = {
  userId: myId,
  name:'Lwandile', 
  email:'lwa@gmail.com',
  isOwner: false,
  isAdmin: false,
};

const theirId = 'user_def';
const theirUserData = {
  userId: theirId,
  name:'Ntuthuko', 
  email:'gasa@gmail.com',
  isOwner: false,
  isAdmin: false,
};

const storeOwnerId = 'store_owner_123';
const storeOwnerData = {
  userId: storeOwnerId,
  isOwner: true,
  isAdmin: false,
};

const otherStoreOwnerId = 'store_owner_333';
const otherStoreOwnerData = {
  userId: otherStoreOwnerId,
  isOwner: true,
  isAdmin: false,
};

const adminId = 'admin_123';
const adminData = {
  userId: adminId,
  isAdmin: true,
  isOwner: false,
};

const someId = 'someId';

// ====================================================================


describe('Our Alcoholic App',()=>{
  
  let testEnv = null;
  let myUser = null;
  let theirUser = null;
  let noUser = null;

  let storeOwnerUser = null;
  let otherStoreOwnerUser = null;
  let adminUser = null;
  
  beforeEach(async () => {
        
    testEnv = await initializeTestEnvironment({
      projectId: "alcoholic-idea",
      firestore: {
        rules: readFileSync("firestore.rules", "utf8"),
          host: "127.0.0.1",
          port: "8080"
      },
    });
    
    // clear datastore
    //await testEnv.clearFirestore();
    //await testEnv.cleanup();

    myUser = testEnv.authenticatedContext(myId);
    theirUser = testEnv.authenticatedContext(theirId);
    noUser = testEnv.unauthenticatedContext();

    storeOwnerUser = testEnv.authenticatedContext(storeOwnerId);
    otherStoreOwnerUser = testEnv.authenticatedContext(otherStoreOwnerId);
    adminUser = testEnv.authenticatedContext(adminId);
    

    // Initial users
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('users').doc(myId).set(myUserData);
    });
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('users').doc(theirId).set(theirUserData);
    });
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('users').doc(storeOwnerId).set(storeOwnerData);
    });
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('users').doc(otherStoreOwnerId).set(otherStoreOwnerData);
    });
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('users').doc(adminId).set(adminData);
    });
    
 });

  afterEach(async () => {

    await testEnv.clearFirestore();
    //await testEnv.cleanup();
    
  });
   
  //========================Begin For Alcoholic=========================
  // clear & npm test
  // Tyres 13 175

  /*
  // Use Case #1.1b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/{storeNameInfoId}
  it('Offline User : Do not allow not logged in users to create store names.', async()=>{

    const doc = noUser.firestore().collection('stores_names_info').doc(someId);
    await assertFails(doc.set({data:'new data'}));
  });
*/
  // Use Case #1.1b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/{storeNameInfoId}
  it('Online User : Do not allow logged in users to create store names.', async()=>{

    const doc = myUser.firestore().collection('stores_names_info').doc(someId);
    await assertFails(doc.set({data:'new data'}));
  });

  // Use Case #1.1b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/{storeNameInfoId}
  it('Store Owner : Do not allow store owners to create store names.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores_names_info').doc(someId);
    await assertFails(doc.set({data:'new data'}));
  });

  // Use Case #1.1b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/{storeNameInfoId}
  it('Admin : Do not allow admins to create store names.', async()=>{

    const doc = adminUser.firestore().collection('stores_names_info').doc(someId);
    await assertFails(doc.set({data:'new data'}));
  });
  



  
  // Use Case #10d, #11 - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/{storeNameInfoId}
  it('Offline User : Allow not logged in users to view all store names.', async()=>{

    const doc = noUser.firestore().collection('stores_names_info').doc(someId);
    await assertSucceeds(doc.get());
  });

  // Use Case #10d, #11 - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/{storeNameInfoId}
  it('Online User : Allow logged in users to view all store names.', async()=>{

    const doc = myUser.firestore().collection('stores_names_info').doc(someId);
    await assertSucceeds(doc.get());
  });

  // Use Case #10d, #11 - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/{storeNameInfoId}
  it('Store Owner : Allow store owners to view all store names.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores_names_info').doc(someId);
    await assertSucceeds(doc.get());
  });

  // Use Case #10d, #11 - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/{storeNameInfoId}
  it('Admin : Allow admins to view all store names.', async()=>{

    const doc = adminUser.firestore().collection('stores_names_info').doc(someId);
    await assertSucceeds(doc.get());
  });
  


  
  // Use Case #1.1c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/{storeNameInfoId}
  it('Offline User : Do not allow not logged in users to update store names.', async()=>{

    const storeNameInfo ={
      storeNameInfoId: 'store_id',
      data: 'old data',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).set(storeNameInfo);
    });

    const doc = noUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId);
    await assertFails(doc.update({data:'new data'}));
  });

  // Use Case #1.1c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/{storeNameInfoId}
  it('Online User : Do not allow logged in users to update store names.', async()=>{

    const storeNameInfo ={
      storeNameInfoId: 'store_id',
      data: 'old data',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).set(storeNameInfo);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId);
    await assertFails(doc.update({data:'new data'}));
  });

  // Use Case #1.1c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/{storeNameInfoId}
  it('Store Owner : Do not allow store owners to update store names.', async()=>{

    const storeNameInfo ={
      storeNameInfoId: 'store_id',
      data: 'old data',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).set(storeNameInfo);
    });

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId);
    await assertFails(doc.update({data:'new data'}));
  });

  // Use Case #1.1c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/{storeNameInfoId}
  it('Admin : Do not allow admins to update store names.', async()=>{

    const storeNameInfo ={
      storeNameInfoId: 'store_id',
      data: 'old data',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).set(storeNameInfo);
    });

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId);
    await assertFails(doc.update({data:'new data'}));
  });
  


  
  // Use Case #1.1d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/{storeNameInfoId}
  it('Offline User : Do not allow not logged in users to delete store names.', async()=>{

    const doc = noUser.firestore().collection('stores_names_info').doc(someId);
    await assertFails(doc.delete());
  });

  // Use Case #1.1d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/{storeNameInfoId}
  it('Online User : Do not allow logged in users to delete store names.', async()=>{

    const doc = myUser.firestore().collection('stores_names_info').doc(someId);
    await assertFails(doc.delete());
  });

  // Use Case #1.1d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/{storeNameInfoId}
  it('Store Owner : Do not allow store owners to delete store names.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores_names_info').doc(someId);
    await assertFails(doc.delete());
  });

  // Use Case #1.1d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/{storeNameInfoId}
  it('Admin : Do not allow admins to delete store names.', async()=>{

    const doc = adminUser.firestore().collection('stores_names_info').doc(someId);
    await assertFails(doc.delete());
  });
  


  
  // Use Case #1.1b, #14 - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/{storeGroupId}
  it('Offline User : Allow not logged in users to create store names groups.', async()=>{


    const doc = noUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups')
    .doc(someId);
    await assertFails(doc.set({data:'new data'}));
  });

  // Use Case #1.1b, #14 - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/{storeGroupId}
  it('Online User : Allow logged in users to create store names groups.', async()=>{

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups')
    .doc(someId);
    await assertFails(doc.set({data:'new data'}));
  });

  // Use Case #1.1b, #14 - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/{storeGroupId}
  it('Store Owner : Do not allow store owners to create store names groups.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups')
    .doc(someId);
    await assertFails(doc.set({data:'new data'}));
    
  });

  // Use Case #1.1b, #14 - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/{storeGroupId}
  it('Admin : Do not allow admins to create store names groups.', async()=>{

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups')
    .doc(someId);
    await assertFails(doc.set({data:'new data'}));

  });
  


    
  
  // Use Case #1.1c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/{storeGroupId}
  it('Offline User : Do not allow not logged in users to update store names groups.', async()=>{

    const storeNameInfo ={
      storeNameInfoId: 'store_id',
      data: 'old data',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'store_group_abc',
      data: 'old data',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).set(storeGroup);
    });

    const doc = noUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId);
    await assertFails(doc.update({data:'new data'}));
  });

  // Use Case #1.1c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/{storeGroupId}
  it('Online User : Do not allow logged in users to update store names groups.', async()=>{

    const storeNameInfo ={
      storeNameInfoId: 'store_id',
      data: 'old data',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'store_group_abc',
      data: 'old data',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).set(storeGroup);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId);
    await assertFails(doc.update({data:'new data'}));
  });

  // Use Case #1.1c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/{storeGroupId}
  it('Store Owner : Do not allow store owners to update store names groups.', async()=>{

    const storeNameInfo ={
      storeNameInfoId: 'store_id',
      data: 'old data',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'store_group_abc',
      data: 'old data',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).set(storeGroup);
    });

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId);
    await assertFails(doc.update({data:'new data'}));
  });

  // Use Case #1.1c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/{storeGroupId}
  it('Admin : Do not allow admins to update store names groups.', async()=>{

    const storeNameInfo ={
      storeNameInfoId: 'store_id',
      data: 'old data',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'store_group_abc',
      data: 'old data',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).set(storeGroup);
    });

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId);
    await assertFails(doc.update({data:'new data'}));

  });
  


  
  // Use Case #10d, #11 - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/{storeGroupId}
  it('Offline User : Allow not logged in users to view store names groups.', async()=>{


    const doc = noUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups')
    .doc(someId);
    await assertSucceeds(doc.get());
  });

  // Use Case #10d, #11 - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/{storeGroupId}
  it('Online User : Allow logged in users to view store names groups.', async()=>{

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups')
    .doc(someId);
    await assertSucceeds(doc.get());
  });

  // Use Case #10d, #11 - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/{storeGroupId}
  it('Store Owner : Allow store owners to view store names groups.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups')
    .doc(someId);
    await assertSucceeds(doc.get());
    
  });

  // Use Case #10d, #11 - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/{storeGroupId}
  it('Admin : Allow admins to view store names groups.', async()=>{

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups')
    .doc(someId);
    await assertSucceeds(doc.get());

  });
  



  
  // Use Case #1.1d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/{storeGroupId}
  it('Offline User : Do not allow not logged in users to delete store name group.', async()=>{


    const doc = noUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups')
    .doc(someId);
    await assertFails(doc.delete());
  });

  // Use Case #1.1d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/{storeGroupId}
  it('Online User : Do not allow logged in users to delete store name group.', async()=>{

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups')
    .doc(someId);
    await assertFails(doc.delete());
  });

  // Use Case #1.1d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/{storeGroupId}
  it('Store Owner : Do not allow store owners to delete store name group.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups')
    .doc(someId);
    await assertFails(doc.delete());
    
  });

  // Use Case #1.1d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/{storeGroupId}
  it('Admin : Do not allow admins to delete store name group.', async()=>{

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups')
    .doc(someId);
    await assertFails(doc.delete());

  });
  
  
  

  /*
  // Use Case #14a - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Offline User : Do not allow not logged in users to create a past post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    const doc = noUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('past_store_posts').doc(post.postId);
    await assertFails(doc.set(post));
  });

  // Use Case #14a - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Online User : Do not allow logged in users who are not store members to create a past post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('past_store_posts').doc(post.postId);
    await assertFails(doc.set(post));
  });

  // Use Case #14a - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Online User : Allow logged in users who are store members to create a past post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(storeNameInfo.storeFK).collection('store_joined_members')
      .doc(myUserData.userId).set(myUserData);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId);
    await assertSucceeds(doc.set(post));
  });

  // Use Case #14a - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Store Owner : Do not allow store owners to create a past post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('past_store_posts').doc(post.postId);
    await assertFails(doc.set(post));
    
  });

  // Use Case #14a - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Admin : Do not allow admins to create a past post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('past_store_posts').doc(post.postId);
    await assertFails(doc.set(post));

  });
  



  
  // Use Case #14b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Offline User : Do not allow not logged in users to view a past post.', async()=>{

    const doc = noUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups').doc(someId)
    .collection('past_store_posts').doc(someId);
    await assertFails(doc.get());
  });

  // Use Case #14b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Online User : Do not allow logged in users who are not store members to view a past post.', async()=>{

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups').doc(someId)
    .collection('past_store_posts').doc(someId);
    await assertFails(doc.get());
  });

  // Use Case #14b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Online User : Allow logged in users who are store members to view a past post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(storeNameInfo.storeFK).collection('store_joined_members')
      .doc(myUserData.userId).set(myUserData);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId);
    await assertSucceeds(doc.get());
  });

  // Use Case #14b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Store Owner : Do not allow store owners to view a past post.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups').doc(someId)
    .collection('past_store_posts').doc(someId);
    await assertFails(doc.get());
    
  });

  // Use Case #14b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Admin : Do not allow admins to view a past post.', async()=>{

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups').doc(someId)
    .collection('past_store_posts').doc(someId);
    await assertFails(doc.get());

  });
  



  
  // Use Case #14c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Offline User : Do not allow not logged in users to update a past post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: someId,    
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('past_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('past_store_posts').doc(post.postId);
    await assertFails(doc.update({data:'new data'}));
    
  });

  // Use Case #14c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Online User : Do not allow logged in users to update a past post they did not create.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: theirId,    
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('past_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('past_store_posts').doc(post.postId);
    await assertFails(doc.update({data:'new data'}));
    
  });

  // Use Case #14c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Online User : Allow logged in users to update a past post they created.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: myId,    
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('past_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('past_store_posts').doc(post.postId);
    await assertSucceeds(doc.update({data:'new data'}));
    
  });

  // Use Case #14c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Store Owner : Do not allow store owners to update a past post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: someId,
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('past_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('past_store_posts').doc(post.postId);
    await assertFails(doc.update({data:'new data'}));
    
  });

  // Use Case #14c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Admin : Do not allow admins to update a past post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: someId,
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('past_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('past_store_posts').doc(post.postId);
    await assertFails(doc.update({data:'new data'}));

  });
  



  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Offline User : Do not allow not logged in users to delete a past post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const doc = noUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId);
    await assertFails(doc.delete());
  });

  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Online User : Do not allow logged in users who did not create a past post to delete it.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId);
    await assertFails(doc.delete());
  });

  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Online User : Allow logged in users who created a past post to delete it.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: myId,
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('past_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId);
    await assertSucceeds(doc.delete());
  });

  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Store Owner : Do not allow store owners to delete a past post not belonging to their store.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: otherStoreOwnerData,
    };

    // Save a store to refer to.
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(store.storeId)
      .set(store);
    });


    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: store.storeId,
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId);
    await assertFails(doc.delete());
    
  });

  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Store Owner : Allow store owners to delete a past post.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: storeOwnerData,
    };

    // Save a store to refer to.
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(store.storeId)
      .set(store);
    });


    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: store.storeId,
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId);
    await assertSucceeds(doc.delete());
    
  });

  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Admin : Allow admins to delete a past post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId);
    await assertSucceeds(doc.delete());

  });
  */



  /*
  // Use Case #15a - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Offline User : Do not allow not logged in users to create a past post comment.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    const doc = noUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('past_store_posts').doc(post.postId).collection('comments').doc(someId);
    await assertFails(doc.set({data:'new data'}));
  });

  // Use Case #15a - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Online User : Do not allow logged in users who are not store members to create a past post comment.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('past_store_posts').doc(post.postId).collection('comments').doc(someId);
    await assertFails(doc.set({data:'new data'}));
  });

  // Use Case #15a - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Online User : Allow logged in users who are store members to create a past post comment.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(storeNameInfo.storeFK).collection('store_joined_members')
      .doc(myUserData.userId).set(myUserData);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId).collection('comments').doc(someId);
    await assertSucceeds(doc.set({data:'new data'}));
  });

  // Use Case #15a - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Store Owner : Do not allow store owners to create a past post comment.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('past_store_posts').doc(post.postId).collection('comments').doc(someId);
    await assertFails(doc.set({data:'new data'}));
    
  });

  // Use Case #15a - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Admin : Do not allow admins to create a past post comment.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('past_store_posts').doc(post.postId)
    .collection('comments').doc(someId);
    await assertFails(doc.set({data:'new data'}));

  }); 
  



  
  // Use Case #15b - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Offline User : Do not allow not logged in users to view a past post comment.', async()=>{

    const doc = noUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups').doc(someId)
    .collection('past_store_posts').doc(someId)
    .collection('comments').doc(someId);
    await assertFails(doc.get());
  });

  // Use Case #15b - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Online User : Do not allow logged in users who are not store members to view a past post comment.', async()=>{

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups').doc(someId)
    .collection('past_store_posts').doc(someId)
    .collection('comments').doc(someId);
    await assertFails(doc.get());
  });

  // Use Case #15b - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Online User : Allow logged in users who are store members to view a past post comment.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(storeNameInfo.storeFK).collection('store_joined_members')
      .doc(myUserData.userId).set(myUserData);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId).collection('comments').doc(someId);
    await assertSucceeds(doc.get());
  });

  // Use Case #15b - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Store Owner : Do not allow store owners to view a past post comment.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups').doc(someId)
    .collection('past_store_posts').doc(someId)
    .collection('comments').doc(someId);
    await assertFails(doc.get());
    
  });

  // Use Case #15b - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Admin : Do not allow admins to view a past post comment.', async()=>{

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups').doc(someId)
    .collection('past_store_posts').doc(someId)
    .collection('comments').doc(someId);
    await assertFails(doc.get());

  });
  



  
  // Use Case #15c - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Offline User : Do not allow not logged in users to update a past post comment.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: someId,    
    }

    const comment = {
      commentId: 'comment_abc',
      creatorUserId: someId,
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('past_store_posts').doc(post.postId)
      .collection('comments').doc(comment.commentId)
      .set(comment);
    });

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId).collection('comments').doc(comment.commentId);
    await assertFails(doc.update({data:'new data'}));
    
  });

  // Use Case #15c - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Online User : Do not allow logged in users to update a past post comment they did not create.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: theirId,    
    }

    const comment = {
      commentId: 'comment_abc',
      creatorUserId: theirId,
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('past_store_posts').doc(post.postId)
      .collection('comments').doc(comment.commentId)
      .set(comment);
    });

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId).collection('comments').doc(comment.commentId);
    await assertFails(doc.update({data:'new data'}));
    
  });

  // Use Case #15c - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Online User : Allow logged in users who created a past post comment to update it.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: myId,    
    }

    const comment = {
      commentId: 'comment_abc',
      creatorUserId: myId,
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('past_store_posts').doc(post.postId)
      .collection('comments').doc(comment.commentId)
      .set(comment);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId).collection('comments').doc(comment.commentId);
    await assertSucceeds(doc.update({data:'new data'}));
    
  });

  // Use Case #15c - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Store Owner : Do not allow store owners to update a past post comment.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: someId,
    }

    const comment = {
      commentId: 'comment_abc',
      creatorUserId: someId,
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('past_store_posts').doc(post.postId)
      .collection('comments').doc(comment.commentId)
      .set(comment);
    });

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId).collection('comments').doc(comment.commentId);
    await assertFails(doc.update({data:'new data'}));
    
  });

  // Use Case #15c - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Admin : Do not allow admins to update a past post comment.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: someId,
    }

    const comment = {
      commentId: 'comment_abc',
      creatorUserId: someId,
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('past_store_posts').doc(post.postId)
      .collection('comments').doc(comment.commentId)
      .set(comment);
    });

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId).collection('comments').doc(comment.commentId);
    await assertFails(doc.update({data:'new data'}));

  });
  



  // Use Case #15d - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Offline User : Do not allow not logged in users to delete a past post comment.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const comment = {
      commentId: 'comment_abc',
      creatorUserId: theirId,
    }

    const post = {
      postId: 'post_abc',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('past_store_posts').doc(post.postId)
      .collection('comments').doc(comment.commentId)
      .set(comment);
    });

    const doc = noUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId).collection('comments').doc(comment.commentId);
    await assertFails(doc.delete());
  });

  // Use Case #15d - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Online User : Do not allow logged in users who did not create a past post comment to delete it.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: myId,
    }

    const comment = {
      commentId: 'comment_abc',
      creatorUserId: theirId,
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('past_store_posts').doc(post.postId)
      .collection('comments').doc(comment.commentId)
      .set(comment);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId).collection('comments').doc(comment.commentId);
    await assertFails(doc.delete());
  });

  // Use Case #15d - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Online User : Allow logged in users who created a past post comment to delete it.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const comment = {
      commentId: 'comment_abc',
      creatorUserId: myId,
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('past_store_posts').doc(post.postId)
      .collection('comments').doc(comment.commentId)
      .set(comment);
    });

    

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId).collection('comments').doc(comment.commentId);
    await assertSucceeds(doc.delete());
  });

  // Use Case #15d - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Store Owner : Do not allow store owners to delete a past post comment not belonging to their store.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: otherStoreOwnerData,
    };

    // Save a store to refer to.
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(store.storeId)
      .set(store);
    });


    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: store.storeId,
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const comment = {
      commentId: 'comment_abc',
      creatorUserId: someId,
    }

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId).collection('comments').doc(comment.commentId);
    await assertFails(doc.delete());
    
  });

  // Use Case #15d - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Store Owner : Allow store owners to delete a past post comment.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: storeOwnerData,
    };

    // Save a store to refer to.
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(store.storeId)
      .set(store);
    });


    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: store.storeId,
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const comment = {
      commentId: 'comment_abc',
      creatorUserId: someId,
    }

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId).collection('comments').doc(comment.commentId);
    await assertSucceeds(doc.delete());
    
  });

  // Use Case #15d - Already Used For Use Case Diagram Modelling.
  // Testing ../stores_groups/storeGroupId/past_store_posts/postId/comments/commentId
  it('Admin : Allow admins to delete a past post comment.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const comment = {
      commentId: 'comment_abc',
      creatorUserId: someId,
    }

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('past_store_posts')
    .doc(post.postId).collection('comments').doc(comment.commentId);
    await assertSucceeds(doc.delete());

  });
  */


  /*
  // Use Case #14a - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Offline User : Do not allow not logged in users to create a normal post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    const doc = noUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('normal_store_posts').doc(post.postId);
    await assertFails(doc.set(post));
  });

  // Use Case #14a - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Online User : Do not allow logged in users who are not store members to create a normal post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('normal_store_posts').doc(post.postId);
    await assertFails(doc.set(post));
  });

  // Use Case #14a - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Online User : Allow logged in users who are store members to create a normal post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(storeNameInfo.storeFK).collection('store_joined_members')
      .doc(myUserData.userId).set(myUserData);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('normal_store_posts')
    .doc(post.postId);
    await assertSucceeds(doc.set(post));
  });

  // Use Case #14a - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Store Owner : Do not allow store owners to create a normal post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('normal_store_posts').doc(post.postId);
    await assertFails(doc.set(post));
    
  });

  // Use Case #14a - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Admin : Do not allow admins to create a normal post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('normal_store_posts').doc(post.postId);
    await assertFails(doc.set(post));

  });
  



  
  // Use Case #14b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Offline User : Do not allow not logged in users to view a normal post.', async()=>{

    const doc = noUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups').doc(someId)
    .collection('normal_store_posts').doc(someId);
    await assertFails(doc.get());
  });

  // Use Case #14b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Online User : Do not allow logged in users who are not store members to view a normal post.', async()=>{

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups').doc(someId)
    .collection('normal_store_posts').doc(someId);
    await assertFails(doc.get());
  });

  // Use Case #14b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Online User : Allow logged in users who are store members to view a normal post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(storeNameInfo.storeFK).collection('store_joined_members')
      .doc(myUserData.userId).set(myUserData);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('normal_store_posts')
    .doc(post.postId);
    await assertSucceeds(doc.get());
  });

  // Use Case #14b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Store Owner : Do not allow store owners to view a normal post.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups').doc(someId)
    .collection('normal_store_posts').doc(someId);
    await assertFails(doc.get());
    
  });

  // Use Case #14b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Admin : Do not allow admins to view a normal post.', async()=>{

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups').doc(someId)
    .collection('normal_store_posts').doc(someId);
    await assertFails(doc.get());

  });
  



  
  // Use Case #14c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Offline User : Do not allow not logged in users to update a normal post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: someId,    
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('normal_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('normal_store_posts').doc(post.postId);
    await assertFails(doc.update({data:'new data'}));
    
  });

  // Use Case #14c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Online User : Do not allow logged in users who are not store members to update a normal post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: theirId,    
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('normal_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('normal_store_posts').doc(post.postId);
    await assertFails(doc.update({data:'new data'}));
    
  });

  // Use Case #14c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Online User : Allow logged in users who are store members to update a normal post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: myId,    
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('normal_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('normal_store_posts').doc(post.postId);
    await assertSucceeds(doc.update({data:'new data'}));
    
  });

  // Use Case #14c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Store Owner : Do not allow store owners to update a normal post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: someId,
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('normal_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('normal_store_posts').doc(post.postId);
    await assertFails(doc.update({data:'new data'}));
    
  });

  // Use Case #14c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Admin : Do not allow admins to update a normal post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: someId,
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('normal_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('normal_store_posts').doc(post.postId);
    await assertFails(doc.update({data:'new data'}));

  });
  




  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Offline User : Do not allow not logged in users to delete a normal post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const doc = noUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('normal_store_posts')
    .doc(post.postId);
    await assertFails(doc.delete());
  });

  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Online User : Do not allow logged in users who did not create a normal post to delete it.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('normal_store_posts')
    .doc(post.postId);
    await assertFails(doc.delete());
  });

  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Online User : Allow logged in users who created a normal post to delete it.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: myId,
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('normal_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('normal_store_posts')
    .doc(post.postId);
    await assertSucceeds(doc.delete());
  });

  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Store Owner : Do not allow store owners to delete a normal post not belonging to their store.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: otherStoreOwnerData,
    };

    // Save a store to refer to.
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(store.storeId)
      .set(store);
    });


    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: store.storeId,
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('normal_store_posts')
    .doc(post.postId);
    await assertFails(doc.delete());
    
  });

  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Store Owner : Allow store owners to delete a normal post.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: storeOwnerData,
    };

    // Save a store to refer to.
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(store.storeId)
      .set(store);
    });


    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: store.storeId,
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('normal_store_posts')
    .doc(post.postId);
    await assertSucceeds(doc.delete());
    
  });

  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/normal_store_posts/{restOfPath=**}
  it('Admin : Allow admins to delete a normal post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('normal_store_posts')
    .doc(post.postId);
    await assertSucceeds(doc.delete());

  });*/


  


  /*
  // Use Case #14a - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Offline User : Do not allow not logged in users to create a future post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    const doc = noUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('future_store_posts').doc(post.postId);
    await assertFails(doc.set(post));
  });

  // Use Case #14a - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Online User : Do not allow logged in users who are not store members to create a future post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('future_store_posts').doc(post.postId);
    await assertFails(doc.set(post));
  });

  // Use Case #14a - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Online User : Allow logged in users who are store members to create a future post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(storeNameInfo.storeFK).collection('store_joined_members')
      .doc(myUserData.userId).set(myUserData);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('future_store_posts')
    .doc(post.postId);
    await assertSucceeds(doc.set(post));
  });

  // Use Case #14a - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Store Owner : Do not allow store owners to create a future post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('future_store_posts').doc(post.postId);
    await assertFails(doc.set(post));
    
  });

  // Use Case #14a - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Admin : Do not allow admins to create a future post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('future_store_posts').doc(post.postId);
    await assertFails(doc.set(post));

  });
  */



  /*
  // Use Case #14b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Offline User : Do not allow not logged in users to view a future post.', async()=>{

    const doc = noUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups').doc(someId)
    .collection('future_store_posts').doc(someId);
    await assertFails(doc.get());
  });

  // Use Case #14b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Online User : Do not allow logged in users who are not store members to future a past post.', async()=>{

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups').doc(someId)
    .collection('future_store_posts').doc(someId);
    await assertFails(doc.get());
  });

  // Use Case #14b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Online User : Allow logged in users who are store members to view a future post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(storeNameInfo.storeFK).collection('store_joined_members')
      .doc(myUserData.userId).set(myUserData);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('future_store_posts')
    .doc(post.postId);
    await assertSucceeds(doc.get());
  });

  // Use Case #14b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Store Owner : Do not allow store owners to view a future post.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups').doc(someId)
    .collection('future_store_posts').doc(someId);
    await assertFails(doc.get());
    
  });

  // Use Case #14b - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/past_store_posts/{restOfPath=**}
  it('Admin : Do not allow admins to view a normal post.', async()=>{

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(someId).collection('stores_groups').doc(someId)
    .collection('past_store_posts').doc(someId);
    await assertFails(doc.get());

  });
  */



  /*
  // Use Case #14c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Offline User : Do not allow not logged in users to update a future post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: someId,    
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('future_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('future_store_posts').doc(post.postId);
    await assertFails(doc.update({data:'new data'}));
    
  });

  // Use Case #14c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Online User : Do not allow logged in users who are not store members to update a future post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: theirId,    
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('future_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('future_store_posts').doc(post.postId);
    await assertFails(doc.update({data:'new data'}));
    
  });

  // Use Case #14c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Online User : Allow logged in users who are store members to update a future post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: myId,    
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('future_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('future_store_posts').doc(post.postId);
    await assertSucceeds(doc.update({data:'new data'}));
    
  });

  // Use Case #14c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Store Owner : Do not allow store owners to update a future post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: someId,
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('future_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('future_store_posts').doc(post.postId);
    await assertFails(doc.update({data:'new data'}));
    
  });

  // Use Case #14c - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Admin : Do not allow admins to update a future post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',

    };

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      data:'old data',
      creatorUserId: someId,
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('future_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups').doc(storeGroup.groupId)
    .collection('future_store_posts').doc(post.postId);
    await assertFails(doc.update({data:'new data'}));

  });*/
  



  /*
  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Offline User : Do not allow not logged in users to delete a future post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const doc = noUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('future_store_posts')
    .doc(post.postId);
    await assertFails(doc.delete());
  });

  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Online User : Do not allow logged in users who did not create a future post to delete it.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('future_store_posts')
    .doc(post.postId);
    await assertFails(doc.delete());
  });

  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Online User : Allow logged in users who created a future post to delete it.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: myId,
    }

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
      .doc(storeGroup.groupId).collection('future_store_posts')
      .doc(post.postId).set(post);
    });

    const doc = myUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('future_store_posts')
    .doc(post.postId);
    await assertSucceeds(doc.delete());
  });

  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Store Owner : Do not allow store owners to delete a future post not belonging to their store.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: otherStoreOwnerData,
    };

    // Save a store to refer to.
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(store.storeId)
      .set(store);
    });


    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: store.storeId,
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('future_store_posts')
    .doc(post.postId);
    await assertFails(doc.delete());
    
  });

  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Store Owner : Allow store owners to delete a future post.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: storeOwnerData,
    };

    // Save a store to refer to.
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(store.storeId)
      .set(store);
    });


    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: store.storeId,
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const doc = storeOwnerUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('future_store_posts')
    .doc(post.postId);
    await assertSucceeds(doc.delete());
    
  });

  // Use Case #14d - Already Used For Use Case Diagram Modelling.
  // Testing /stores_names_info/storeNameInfoId/stores_groups/storeGroupId/future_store_posts/{restOfPath=**}
  it('Admin : Allow admins to delete a future post.', async()=>{

    const storeNameInfo = {
      storeNameInfoId: 'store_id',
      storeFK: 'store_fk',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores_names_info')
      .doc(storeNameInfo.storeNameInfoId)
      .set(storeNameInfo);
    });

    const storeGroup = {
      groupId: 'group_abc',
    };

    const post = {
      postId: 'post_xyz',
      creatorUserId: theirId,
    }

    const doc = adminUser.firestore().collection('stores_names_info')
    .doc(storeNameInfo.storeNameInfoId).collection('stores_groups')
    .doc(storeGroup.groupId).collection('future_store_posts')
    .doc(post.postId);
    await assertSucceeds(doc.delete());

  });*/



  
  /*
  // Testing /recent_wins/{recentWinId} 
  // Use Case #13a On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to create recent wins.', async()=>{

    const doc = noUser.firestore().collection('recent_wins').doc(someId);
    await assertFails(doc.set({data:'new data'}));
  }); // Working As Expected.

  // Testing /recent_wins/{recentWinId} 
  // Use Case #13a On A Use Case Diagram.
  it('Online User : Do not allow logged in users to create recent wins.', async()=>{

    const doc = myUser.firestore().collection('recent_wins').doc(someId);
    await assertFails(doc.set({data:'new data'}));
  }); // Working As Expected.

  // Testing /recent_wins/{recentWinId} 
  // Use Case #13a On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to create recent wins.', async()=>{

    const doc = storeOwnerUser.firestore().collection('recent_wins').doc(someId);
    await assertFails(doc.set({data:'new data'}));
  }); // Working As Expected.

  // Testing /recent_wins/{recentWinId} 
  // Use Case #13a On A Use Case Diagram.
  it('Admin : Do not allow store admins to create recent wins.', async()=>{

    const doc = adminUser.firestore().collection('recent_wins').doc(someId);
    await assertFails(doc.set({data:'new data'}));
  }); // Working As Expected.
  */


  /*
  // Testing /recent_wins/{recentWinId} 
  it('Offline User : Do not allow not logged in users to delete recent wins.', async()=>{

    const doc = myUser.firestore().collection('recent_wins').doc(someId);
    await assertFails(doc.delete());
  }); // Working As Expected.
  
  // Testing /recent_wins/{recentWinId} 
  it('Online User : Do not allow logged in users to delete recent wins.', async()=>{

    const doc = myUser.firestore().collection('recent_wins').doc(someId);
    await assertFails(doc.delete());
  }); // Working As Expected.
  
  // Testing /recent_wins/{recentWinId} 
  it('Store Owner : Do not allow store owners to delete recent wins.', async()=>{

    const doc = storeOwnerUser.firestore().collection('recent_wins').doc(someId);
    await assertFails(doc.delete());
  }); // Working As Expected.
  
  // Testing /recent_wins/{recentWinId} 
  it('Admin : Do not allow store admins to create delete wins.', async()=>{

    const doc = adminUser.firestore().collection('recent_wins').doc(someId);
    await assertFails(doc.delete());
  }); // Working As Expected.
  */


  /*
  // Testing /recent_wins/{recentWinId} 
  // Use Case #13b On A Use Case Diagram.
  it('Offline User : Allow not logged in users to view recent wins.', async()=>{

    const doc = noUser.firestore().collection('recent_wins').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /recent_wins/{recentWinId} 
  // Use Case #13b On A Use Case Diagram.
  it('Online User : Allow logged in users to view recent wins.', async()=>{

    const doc = myUser.firestore().collection('recent_wins').doc(myUserData.userId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /recent_wins/{recentWinId} 
  // Use Case #13b On A Use Case Diagram.
  it('Store Owner : Allow store owners to view recent wins.', async()=>{

    const doc = storeOwnerUser.firestore().collection('recent_wins').doc(storeOwnerData.userId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /recent_wins/{recentWinId} 
  // Use Case #13b On A Use Case Diagram.
  it('Admin : Allow store admins to view recent wins.', async()=>{

    const doc = adminUser.firestore().collection('recent_wins').doc(adminData.userId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.
  */
  
  
  /*
  // Testing /recent_wins/{recentWinId} 
  it('Offline User : Do not allow not logged in users to update a recent won prices.', async()=>{

    const wonPrice = {
      data:'old data',
      wonPriceId: 'abc',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('recent_wins')
      .doc(wonPrice.wonPriceId).set(wonPrice);
    });

    const doc = noUser.firestore().collection('recent_wins').doc(wonPrice.wonPriceId);
    await assertFails(doc.update({data:'new data'}));
  }); // Working As Expected.
  
  // Testing /recent_wins/{recentWinId} 
  it('Online User : Do not allow logged in users to update a recent won prices.', async()=>{

    const wonPrice = {
      data:'old data',
      wonPriceId: 'abc',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('recent_wins')
      .doc(wonPrice.wonPriceId).set(wonPrice);
    });

    const doc = myUser.firestore().collection('recent_wins').doc(wonPrice.wonPriceId);
    await assertFails(doc.update({data:'new data'}));
  }); // Working As Expected.
  
  // Testing /recent_wins/{recentWinId} 
  it('Store Owner : Do not allow store owners to update a recent won prices.', async()=>{

    const wonPrice = {
      data:'old data',
      wonPriceId: 'abc',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('recent_wins')
      .doc(wonPrice.wonPriceId).set(wonPrice);
    });

    const doc = storeOwnerUser.firestore().collection('recent_wins').doc(wonPrice.wonPriceId);
    await assertFails(doc.update({data:'new data'}));
  }); // Working As Expected.
  
  // Testing Testing /recent_wins/{recentWinId} 
  it('Admin : Do not allow store admins to update a recent won prices.', async()=>{

    const wonPrice = {
      data:'old data',
      wonPriceId: 'abc',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('recent_wins')
      .doc(wonPrice.wonPriceId).set(wonPrice);
    });

    const doc = adminUser.firestore().collection('recent_wins').doc(wonPrice.wonPriceId);
    await assertFails(doc.update({data:'new data'}));
  }); // Working As Expected.
  */


  
  // Testing /won_prices_summaries/{wonPriceSummaryId}
  // Use Case #8a On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to create won prices.', async()=>{

    const doc = noUser.firestore().collection('won_prices_summaries').doc(someId);
    await assertFails(doc.set({data:'new data'}));
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}
  // Use Case #8a On A Use Case Diagram.
  it('Online User : Do not allow logged in users to create won prices.', async()=>{

    const doc = myUser.firestore().collection('won_prices_summaries').doc(someId);
    await assertFails(doc.set({data:'new data'}));
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}
  // Use Case #8a On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to create won prices.', async()=>{

    const doc = storeOwnerUser.firestore().collection('won_prices_summaries').doc(someId);
    await assertFails(doc.set({data:'new data'}));
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}
  // Use Case #8a On A Use Case Diagram.
  it('Admin : Do not allow store admins to create won prices.', async()=>{

    const doc = adminUser.firestore().collection('won_prices_summaries').doc(someId);
    await assertFails(doc.set({data:'new data'}));
  }); // Working As Expected.

  

  
  // Testing /won_prices_summaries/{wonPriceSummaryId}
  // Use Case #8b On A Use Case Diagram.
  it('Offline User : Allow not logged in users to view won price summaries.', async()=>{

    const doc = noUser.firestore().collection('won_prices_summaries').doc(myId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}
  // Use Case #8b On A Use Case Diagram.
  it('Online User : Allow logged in users to view won price summaries.', async()=>{

    const doc = myUser.firestore().collection('won_prices_summaries').doc(myId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}
  // Use Case #8b On A Use Case Diagram.
  it('Store Owner : Allow store owners to view won price summaries.', async()=>{

    const doc = storeOwnerUser.firestore().collection('won_prices_summaries').doc(myId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}
  // Use Case #8b On A Use Case Diagram.
  it('Admin : Allow admins to view won price summaries.', async()=>{

    const doc = adminUser.firestore().collection('won_prices_summaries').doc(myId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.
  



  
  // Testing /won_prices_summaries/{wonPriceSummaryId}
  // Use Case #8c On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to update won prices.', async()=>{

    const wonPrice = {
      data:'old data',
      wonPriceId: 'abc',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('won_prices_summaries')
      .doc(wonPrice.wonPriceId).set(wonPrice);
    });

    const doc = noUser.firestore().collection('won_prices_summaries').doc(wonPrice.wonPriceId);
    await assertFails(doc.update({data:'new data'}));
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}
  // Use Case #8c On A Use Case Diagram.
  it('Online User : Do not allow logged in users to update won prices.', async()=>{

    const wonPrice = {
      data:'old data',
      wonPriceId: 'abc',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('won_prices_summaries')
      .doc(wonPrice.wonPriceId).set(wonPrice);
    });

    const doc = myUser.firestore().collection('won_prices_summaries').doc(wonPrice.wonPriceId);
    await assertFails(doc.update({data:'new data'}));
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId} 
  // Use Case #8c On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to update won prices.', async()=>{

    const wonPrice = {
      data:'old data',
      wonPriceId: 'abc',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('won_prices_summaries')
      .doc(wonPrice.wonPriceId).set(wonPrice);
    });

    const doc = storeOwnerUser.firestore().collection('won_prices_summaries').doc(wonPrice.wonPriceId);
    await assertFails(doc.update({data:'new data'}));
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}
  // Use Case #8c On A Use Case Diagram.
  it('Admin : Do not allow store admins to update won prices.', async()=>{

    const wonPrice = {
      data:'old data',
      wonPriceId: 'abc',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('won_prices_summaries')
      .doc(wonPrice.wonPriceId).set(wonPrice);
    });

    const doc = adminUser.firestore().collection('won_prices_summaries').doc(wonPrice.wonPriceId);
    await assertFails(doc.update({data:'new data'}));
  }); // Working As Expected.
  


  
  // Testing /won_prices_summaries/{wonPriceSummaryId}
  // Use Case #8c On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to delete won prices.', async()=>{

    const doc = noUser.firestore().collection('won_prices_summaries').doc(someId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}
  // Use Case #8c On A Use Case Diagram.
  it('Online User : Do not allow logged in users to delete won prices.', async()=>{

    const doc = myUser.firestore().collection('won_prices_summaries').doc(someId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId} 
  // Use Case #8c On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to delete won prices.', async()=>{

    const doc = storeOwnerUser.firestore().collection('won_prices_summaries').doc(someId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}
  // Use Case #8c On A Use Case Diagram.
  it('Admin : Do not allow store admins to delete won prices.', async()=>{

    const doc = adminUser.firestore().collection('won_prices_summaries').doc(someId);
    await assertFails(doc.delete());
  }); // Working As Expected.
  


  /*
  // Testing /won_prices_summaries/wonPriceSummaryId/comments/commentId
  // Use Case #12 On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to comment on the won price.', async()=>{

    const doc = noUser.firestore().collection('won_prices_summaries')
    .doc(someId).collection('comments').doc(someId);
    await assertFails(doc.set({someData: 'whatever'}));
  }); // Working As Expected.
  
  // Testing /won_prices_summaries/wonPriceSummaryId/comments/commentId
  // Use Case #12 On A Use Case Diagram.
  it('Online User : Allow logged in users to comment on the won price.', async()=>{

    const doc = myUser.firestore().collection('won_prices_summaries')
    .doc(someId).collection('comments').doc(someId);
    await assertSucceeds(doc.set({someData: 'whatever'}));
  });  // Working As Expected.

  // Testing /won_prices_summaries/wonPriceSummaryId/comments/commentId
  // Use Case #12 On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to comment on the won price except for the one owning a store from which a price was obtained from.', async()=>{

    const owner = {
      isOwner: true,
      userId: 'user_XXX',
    }

    // Save store owner
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('users').doc(owner.userId)
      .set(owner);
    });


    const store = {
      storeOwner: owner,
      storeId: 'store_opq',
      storeName: '626',
    }

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const comment = {
      wonPriceCommentId:'c123',
      storeOriginId: store.storeId,
      
    }


    const doc = storeOwnerUser.firestore().collection('won_prices_summaries')
    .doc(someId).collection('comments').doc(comment.wonPriceCommentId);
    await assertFails(doc.set(comment));
  });  // Working As Expected.

  // Testing /won_prices_summaries/wonPriceSummaryId/comments/commentId
  it('Store Owner : Allow store owners to comment on the won price belonging to their store.', async()=>{

    const store = {
      storeOwner: storeOwnerData,
      storeId: 'store_xyz',
      storeName: 'nkuxa joyinti',
    }

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const comment = {
      wonPriceCommentId:'c246',
      storeOriginId: store.storeId,
      
    }


    const doc = storeOwnerUser.firestore().collection('won_prices_summaries')
    .doc(someId).collection('comments').doc(comment.wonPriceCommentId);
    await assertSucceeds(doc.set(comment));
  });  // Working As Expected.

  // Testing /won_prices_summaries/wonPriceSummaryId/comments/commentId
  // Use Case #12 On A Use Case Diagram.
  it('Admin : Allow admins to comment on the won price.', async()=>{

    const doc = adminUser.firestore().collection('won_prices_summaries')
    .doc(someId).collection('comments').doc(someId);
    await assertFails(doc.set({someData: 'whatever'}));
  });  // Working As Expected.
  */


  /*
  // Testing /won_prices_summaries/wonPriceSummaryId/comments/commentId
  // Use Case #12 On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to update a comment.', async()=>{

    const comment = {
      wonPriceCommentId:'c246',
      storeOriginId: 'store_id',
      creatorUserId: someId,
    }

     // Save comment to refer to.
     await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('won_prices_summaries')
      .doc(someId).collection('comments').doc(comment.wonPriceCommentId)
      .set(comment);
    });

    const doc = noUser.firestore().collection('won_prices_summaries')
    .doc(someId).collection('comments').doc(comment.wonPriceCommentId);
    
    await assertFails(doc.update({storeOriginId: 'whatever'}));
  }); // Working As Expected.

  // Testing /won_prices_summaries/wonPriceSummaryId/comments/commentId
  // Use Case #12 On A Use Case Diagram.
  it('Online User : Do not allow logged in users to update a comment they did not create.', async()=>{

    const comment = {
      wonPriceCommentId:'c246',
      storeOriginId: 'store_id',
      creatorUserId: someId,
    }

     // Save comment to refer to.
     await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('won_prices_summaries')
      .doc(someId).collection('comments').doc(comment.wonPriceCommentId)
      .set(comment);
    });

    const doc = myUser.firestore().collection('won_prices_summaries')
    .doc(someId).collection('comments').doc(comment.wonPriceCommentId);
    
    await assertFails(doc.update({storeOriginId: 'whatever'}));

  });  // Working As Expected.
  
  // Testing /won_prices_summaries/wonPriceSummaryId/comments/commentId
  // Use Case #12 On A Use Case Diagram.
  it('Online User : Allow logged in users to update a comment they created.', async()=>{

    const comment = {
      wonPriceCommentId:'c246',
      storeOriginId: 'store_id',
      creatorUserId: myId,
    }

     // Save comment to refer to.
     await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('won_prices_summaries')
      .doc(someId).collection('comments').doc(comment.wonPriceCommentId)
      .set(comment);
    });

    const doc = myUser.firestore().collection('won_prices_summaries')
    .doc(someId).collection('comments').doc(comment.wonPriceCommentId);
    
    await assertSucceeds(doc.update({storeOriginId: 'whatever'}));

  });  // Working As Expected.

  // Testing /won_prices_summaries/wonPriceSummaryId/comments/commentId
  // Use Case #12 On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to update comments they did not create.', async()=>{

    const comment = {
      wonPriceCommentId:'c246',
      storeOriginId: 'store_id',
      creatorUserId: theirId,
    }

     // Save comment to refer to.
     await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('won_prices_summaries')
      .doc(someId).collection('comments').doc(comment.wonPriceCommentId)
      .set(comment);
    });

    const doc = storeOwnerUser.firestore().collection('won_prices_summaries')
    .doc(someId).collection('comments').doc(comment.wonPriceCommentId);
    
    await assertFails(doc.update({storeOriginId: 'whatever'}));

  });  // Working As Expected.

  // Testing /won_prices_summaries/wonPriceSummaryId/comments/commentId
  // Use Case #12 On A Use Case Diagram.
  it('Store Owner : Allow store owners to update comments they created.', async()=>{

    const comment = {
      wonPriceCommentId:'c246',
      storeOriginId: 'store_id',
      creatorUserId: storeOwnerId,
    }

     // Save comment to refer to.
     await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('won_prices_summaries')
      .doc(someId).collection('comments').doc(comment.wonPriceCommentId)
      .set(comment);
    });

    const doc = storeOwnerUser.firestore().collection('won_prices_summaries')
    .doc(someId).collection('comments').doc(comment.wonPriceCommentId);
    
    await assertSucceeds(doc.update({storeOriginId: 'whatever'}));

  });  // Working As Expected.

  // Testing /won_prices_summaries/wonPriceSummaryId/comments/commentId
  // Use Case #12 On A Use Case Diagram.
  it('Admin : Do not allow admins to update comments on the won price.', async()=>{

    const comment = {
      wonPriceCommentId:'c246',
      storeOriginId: 'store_id',
      creatorUserId: adminId,
    }

     // Save comment to refer to.
     await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('won_prices_summaries')
      .doc(someId).collection('comments').doc(comment.wonPriceCommentId)
      .set(comment);
    });

    const doc = adminUser.firestore().collection('won_prices_summaries')
    .doc(someId).collection('comments').doc(comment.wonPriceCommentId);

    await assertFails(doc.update({storeOriginId: 'whatever'}));
  });  // Working As Expected.
  */


  /*
  // Testing /won_prices_summaries/{wonPriceSummaryId}/beg_requests/{begRequestId}
  it('Offline User : Do not allow not logged in users to create this beg request.', async()=>{

    const doc = noUser.firestore().collection('won_prices_summaries')
    .doc(someId).collection('beg_request').doc(someId);
    await assertFails(doc.set({someField: 'whatever'}));
  }); // Working As Expected.
  
  // Testing /won_prices_summaries/{wonPriceSummaryId}/beg_requests/{begRequestId}
  it('Online User : Do not allow logged in users to create beg requests for themselves.', async()=>{

    const wonPriceSummary = {
      wonPriceSummaryId: 'wonPriceId1',
      user: myUserData,
    };

    // We need a won price summary to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('won_prices_summaries')
      .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });

    // We need to say current user is an alcoholic of a winner and vice versa.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('users')
      .doc(myUserData.userId).collection('my_alcoholics')
      .doc(myUserData.userId).set(myUserData);
    });

    const doc = myUser.firestore().collection('won_prices_summaries')
    .doc(wonPriceSummary.wonPriceSummaryId).collection('beg_requests').doc('someId3');
    await assertFails(doc.set({'begRequest': 'foo'}));
  });  // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}/beg_requests/{begRequestId}
  it('Store Owner : Do not allow store owners to create beg requests for themselves.', async()=>{

    const wonPriceSummary = {
      wonPriceSummaryId: 'wonPriceId1',
      user: storeOwnerData,
    };

    // We need a won price summary to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('won_prices_summaries')
      .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });

    // We need to say current user is an alcoholic of a winner and vice versa.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('users')
      .doc(storeOwnerData.userId).collection('my_alcoholics')
      .doc(storeOwnerData.userId).set(storeOwnerData);
    });

    const doc = storeOwnerUser.firestore().collection('won_prices_summaries')
    .doc(wonPriceSummary.wonPriceSummaryId).collection('beg_requests').doc('someId3');
    await assertFails(doc.set({'begRequest': 'foo'}));
  });  // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}/beg_requests/{begRequestId}
  it('Admin : Do not allow admins to create beg requests for themselves.', async()=>{

    const wonPriceSummary = {
      wonPriceSummaryId: 'wonPriceId1',
      user: adminData,
    };

    // We need a won price summary to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('won_prices_summaries')
      .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });

    // We need to say current user is an alcoholic of a winner and vice versa.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('users')
      .doc(adminData.userId).collection('my_alcoholics')
      .doc(adminData.userId).set(adminData);
    });

    const doc = adminUser.firestore().collection('won_prices_summaries')
    .doc(wonPriceSummary.wonPriceSummaryId).collection('beg_requests').doc('someId3');
    await assertFails(doc.set({'begRequest': 'foo'}));
  });  // Working As Expected.
  */
  
  
  /*
  // Testing /won_prices_summaries/{wonPriceSummaryId}/beg_requests/{begRequestId}
  it('Online User : Do not allow logged in users to create beg requests on people who are not their alcoholics.', async()=>{

    const wonPriceSummary = {
      wonPriceSummaryId: 'wonPriceId2',
      user: theirUserData,
    };

    // We need a won price summary to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('won_prices_summaries')
      .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });

    const doc = myUser.firestore().collection('won_prices_summaries')
    .doc(wonPriceSummary.wonPriceSummaryId).collection('beg_requests').doc('someId4');
    await assertFails(doc.set({'begRequest': 'foo'}));
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}/beg_requests/{begRequestId}
  it('Store Owner : Do not allow store owners to create beg requests on people who are not their alcoholics.', async()=>{

    const wonPriceSummary = {
      wonPriceSummaryId: 'wonPriceId2',
      user: theirUserData,
    };

    // We need a won price summary to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('won_prices_summaries')
      .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });

    const doc = storeOwnerUser.firestore().collection('won_prices_summaries')
    .doc(wonPriceSummary.wonPriceSummaryId).collection('beg_requests').doc('someId4');
    await assertFails(doc.set({'begRequest': 'foo'}));
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}/beg_requests/{begRequestId}
  it('Admin : Do not allow admins to create beg requests on people who are not their alcoholics.', async()=>{

    const wonPriceSummary = {
      wonPriceSummaryId: 'wonPriceId2',
      user: theirUserData,
    };

    // We need a won price summary to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('won_prices_summaries')
      .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });

    const doc = adminUser.firestore().collection('won_prices_summaries')
    .doc(wonPriceSummary.wonPriceSummaryId).collection('beg_requests').doc('someId4');
    await assertFails(doc.set({'begRequest': 'foo'}));
  }); // Working As Expected.
  
  

  // Testing /won_prices_summaries/{wonPriceSummaryId}/beg_requests/{begRequestId}
  it('Online User : Allow a logged in user to beg another user only if they are each others\'s alcoholics.', async()=>{

    const wonPriceSummary = {
      wonPriceSummaryId: 'wonPriceId4',
      user: theirUserData,
    };

    // We need a won price summary to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('won_prices_summaries')
      .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });

    
    // We need to say current user is an alcoholic of a winner and vice versa.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('users')
      .doc(theirUserData.userId).collection('my_alcoholics')
      .doc(myUserData.userId).set(myUserData);
    });
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('users')
      .doc(myUserData.userId).collection('my_alcoholics')
      .doc(theirUserData.userId).set(theirUserData);
    });

    const doc = myUser.firestore().collection('won_prices_summaries')
    .doc(wonPriceSummary.wonPriceSummaryId).collection('beg_requests').doc('someId5');
    await assertSucceeds(doc.set({'begRequest': 'foo'}));
  });  // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}/beg_requests/{begRequestId}
  it('Store Owner : Allow a store owner to beg another user only if they are each others\'s alcoholics.', async()=>{

    const wonPriceSummary = {
      wonPriceSummaryId: 'wonPriceId4',
      user: theirUserData,
    };

    // We need a won price summary to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('won_prices_summaries')
      .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });

    
    // We need to say the logged in store owner is an alcoholic of a winner and vice versa.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('users')
      .doc(theirUserData.userId).collection('my_alcoholics')
      .doc(storeOwnerData.userId).set(storeOwnerData);
    });
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('users')
      .doc(storeOwnerData.userId).collection('my_alcoholics')
      .doc(theirUserData.userId).set(theirUserData);
    });

    const doc = storeOwnerUser.firestore().collection('won_prices_summaries')
    .doc(wonPriceSummary.wonPriceSummaryId).collection('beg_requests').doc('someId5');
    await assertSucceeds(doc.set({'begRequest': 'foo'}));
  });  // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}/beg_requests/{begRequestId}
  it('Admin : Allow an admin to beg another user only if they are each others\'s alcoholics.', async()=>{

    const wonPriceSummary = {
      wonPriceSummaryId: 'wonPriceId4',
      user: theirUserData,
    };

    // We need a won price summary to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('won_prices_summaries')
      .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });

    
    // We need to say the logged in store owner is an alcoholic of a winner and vice versa.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('users')
      .doc(theirUserData.userId).collection('my_alcoholics')
      .doc(adminData.userId).set(adminData);
    });
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('users')
      .doc(adminData.userId).collection('my_alcoholics')
      .doc(theirUserData.userId).set(theirUserData);
    });

    const doc = adminUser.firestore().collection('won_prices_summaries')
    .doc(wonPriceSummary.wonPriceSummaryId).collection('beg_requests').doc('someId5');
    await assertSucceeds(doc.set({'begRequest': 'foo'}));
  });  // Working As Expected.
  */


  // Testing /found_alcohol/{foundAlcoholId}
  // Use Case #9a On A Use Case Diagram.
  it('Offline User: Do not allow not logged in users to create found alcohol.', async()=>{

    const doc = noUser.firestore().collection('found_alcohol').doc(myId);
    await assertFails(doc.set({data:'new data'}));
  }); // Working As Expected.

  // Testing /found_alcohol/{foundAlcoholId}
  // Use Case #9a On A Use Case Diagram.
  it('Online User: Do not allow logged in users to create found alcohol.', async()=>{

    const doc = myUser.firestore().collection('found_alcohol').doc(myId);
    await assertFails(doc.set({data:'new data'}));
  }); // Working As Expected.

  // Testing /found_alcohol/{foundAlcoholId}
  // Use Case #9a On A Use Case Diagram.
  it('Store Owner: Do not allow store owners to create found alcohol.', async()=>{

    const doc = storeOwnerUser.firestore().collection('found_alcohol').doc(myId);
    await assertFails(doc.set({data:'new data'}));
  }); // Working As Expected.

  // Testing /found_alcohol/{foundAlcoholId}
  // Use Case #9a On A Use Case Diagram.
  it('Admin: Do not allow admins to create found alcohol.', async()=>{

    const doc = adminUser.firestore().collection('found_alcohol').doc(myId);
    await assertFails(doc.set({data:'new data'}));
  }); // Working As Expected.
  



  // Testing /found_alcohol/{foundAlcoholId}
  // Use Case #9a On A Use Case Diagram.
  it('Offline User: Do not allow not logged in users to delete found alcohol.', async()=>{

    const doc = noUser.firestore().collection('found_alcohol').doc(myId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /found_alcohol/{foundAlcoholId}
  // Use Case #9a On A Use Case Diagram.
  it('Online User: Do not allow logged in users to delete found alcohol.', async()=>{

    const doc = myUser.firestore().collection('found_alcohol').doc(myId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /found_alcohol/{foundAlcoholId}
  // Use Case #9a On A Use Case Diagram.
  it('Store Owner: Do not allow store owners to delete found alcohol.', async()=>{

    const doc = storeOwnerUser.firestore().collection('found_alcohol').doc(myId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /found_alcohol/{foundAlcoholId}
  // Use Case #9a On A Use Case Diagram.
  it('Admin: Do not allow admins to delete found alcohol.', async()=>{

    const doc = adminUser.firestore().collection('found_alcohol').doc(myId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  

  
  // Testing /found_alcohol/{foundAlcoholId}
  // Use Case #9b On A Use Case Diagram.
  it('Offline User: Allow not logged in users to search for alcohol.', async()=>{

    const doc = noUser.firestore().collection('found_alcohol').doc(myId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /found_alcohol/{foundAlcoholId}
  // Use Case #9b On A Use Case Diagram.
  it('Online User: Allow logged in users to search for alcohol.', async()=>{

    const doc = myUser.firestore().collection('found_alcohol').doc(myId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /found_alcohol/{foundAlcoholId}
  // Use Case #9b On A Use Case Diagram.
  it('Store Owner: Allow store owners to search for alcohol.', async()=>{

    const doc = storeOwnerUser.firestore().collection('found_alcohol').doc(myId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /found_alcohol/{foundAlcoholId}
  // Use Case #9b On A Use Case Diagram.
  it('Admin: Allow admins to search for alcohol.', async()=>{

    const doc = adminUser.firestore().collection('found_alcohol').doc(myId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.
  
  

  
  // Testing /found_stores_with_competition/{foundStoresWithCompetitionId}
  // Use Case #10b On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to create a store with competition.', async()=>{

    const doc = noUser.firestore().collection('found_stores_with_competition').doc(someId);
    await assertFails(doc.set({data: 'new data'}));
  }); // Working As Expected.

  // Testing /found_stores_with_competition/{foundStoresWithCompetitionId}
  // Use Case #10b On A Use Case Diagram.
  it('Online User : Do not allow logged in users to create a store with competition.', async()=>{

    const doc = myUser.firestore().collection('found_stores_with_competition').doc(someId);
    await assertFails(doc.set({data: 'new data'}));
  }); // Working As Expected.

  // Testing /found_stores_with_competition/{foundStoresWithCompetitionId}
  // Use Case #10b On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to create a store with competition.', async()=>{

    const doc = storeOwnerUser.firestore().collection('found_stores_with_competition').doc(someId);
    await assertFails(doc.set({data: 'new data'}));
  }); // Working As Expected.

  // Testing /found_stores_with_competition/{foundStoresWithCompetitionId}
  // Use Case #10b On A Use Case Diagram.
  it('Admin : Do not allow admins to create a store with competition.', async()=>{

    const doc = adminUser.firestore().collection('found_stores_with_competition').doc(someId);
    await assertFails(doc.set({data: 'new data'}));
  }); // Working As Expected.
  

 
 // Testing /found_stores_with_competition/{foundStoresWithCompetitionId}
 // Use Case #10b On A Use Case Diagram.
 it('Offline User : Do not allow not logged in users to delete stores with competitions.', async()=>{

  const doc = noUser.firestore().collection('found_stores_with_competition').doc(someId);
  await assertFails(doc.delete());
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}
// Use Case #10b On A Use Case Diagram.
it('Online User : Do not allow logged in users to delete stores with competitions.', async()=>{

  const doc = myUser.firestore().collection('found_stores_with_competition').doc(someId);
  await assertFails(doc.delete());
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}
// Use Case #10b On A Use Case Diagram.
it('Store Owner : Do not allow store owners to delete stores with competitions.', async()=>{

  const doc = storeOwnerUser.firestore().collection('found_stores_with_competition').doc(someId);
  await assertFails(doc.delete());
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}
// Use Case #10b On A Use Case Diagram.
it('Admin : Do not allow admins to delete stores with competitions.', async()=>{

  const doc = adminUser.firestore().collection('found_stores_with_competition').doc(someId);
  await assertFails(doc.delete());
}); // Working As Expected.




// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}
 it('Offline User : Do not allow not logged in users to update stores with competitions.', async()=>{

  const foundStoreWithCompetition = {
    storeName: 'store_xyz',
    storeFK: 'store_id',
  }

  // Save found store with competition to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition')
    .doc(foundStoreWithCompetition.storeFK).set(foundStoreWithCompetition);
  });

  const doc = noUser.firestore().collection('found_stores_with_competition')
  .doc(foundStoreWithCompetition.storeFK);
  await assertFails(doc.update({storeName:'xxx'}));
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}
it('Online User : Do not allow logged in users to update stores with competitions.', async()=>{

  const foundStoreWithCompetition = {
    storeName: 'store_xyz',
    storeFK: 'store_id',
  }

  // Save found store with competition to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition')
    .doc(foundStoreWithCompetition.storeFK).set(foundStoreWithCompetition);
  });

  const doc = myUser.firestore().collection('found_stores_with_competition')
  .doc(foundStoreWithCompetition.storeFK);
  await assertFails(doc.update({storeName:'xxx'}));
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}
it('Store Owner : Do not allow store owners to update stores with competitions.', async()=>{

  const foundStoreWithCompetition = {
    storeName: 'store_xyz',
    storeFK: 'store_id',
  }

  // Save found store with competition to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition')
    .doc(foundStoreWithCompetition.storeFK).set(foundStoreWithCompetition);
  });

  const doc = storeOwnerUser.firestore().collection('found_stores_with_competition')
  .doc(foundStoreWithCompetition.storeFK);
  await assertFails(doc.update({storeName:'xxx'}));
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}
it('Admin : Do not allow admins to update stores with competitions.', async()=>{

  const foundStoreWithCompetition = {
    storeName: 'store_xyz',
    storeFK: 'store_id',
  }

  // Save found store with competition to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition')
    .doc(foundStoreWithCompetition.storeFK).set(foundStoreWithCompetition);
  });

  const doc = adminUser.firestore().collection('found_stores_with_competition')
  .doc(foundStoreWithCompetition.storeFK);
  await assertFails(doc.update({storeName:'xxx'}));
}); // Working As Expected.



 // Testing /found_stores_with_competition/{foundStoresWithCompetitionId}
 // Use Case #10d, #11 On A Use Case Diagram.
 it('Offline User : Allow not logged in users to search for stores with competitions.', async()=>{

  const query = noUser.firestore().collection('found_stores_with_competition');
  await assertSucceeds(query.get());
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Online User : Allow logged in users to search for stores with competitions.', async()=>{

  const query = myUser.firestore().collection('found_stores_with_competition');
  await assertSucceeds(query.get());
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Store Owner : Allow store owners to search for stores with competitions.', async()=>{

  const query = storeOwnerUser.firestore().collection('found_stores_with_competition');
  await assertSucceeds(query.get());
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Admin : Allow admins to search for stores with competitions.', async()=>{

  const query = adminUser.firestore().collection('found_stores_with_competition');
  await assertSucceeds(query.get());
}); // Working As Expected.





// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
// Use Case #10b On A Use Case Diagram.
it('Offline User: Do not allow not logged in users to create grand prices for a found store.', async()=>{

  const doc = noUser.firestore().collection('found_stores_with_competition/' 
  + someId + '/found_grand_prices').doc(someId);
  await assertFails(doc.set({data:'new data'}));
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
// Use Case #10b On A Use Case Diagram.
it('Online User: Do not allow logged in users to create grand prices for a found store.', async()=>{

  const doc = myUser.firestore().collection('found_stores_with_competition/' 
  + someId + '/found_grand_prices').doc(someId);
  await assertFails(doc.set({data:'new data'}));
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
// Use Case #10b On A Use Case Diagram.
it('Store Owner: Do not allow store owners to create grand prices for a found store.', async()=>{

  const doc = storeOwnerUser.firestore().collection('found_stores_with_competition/' 
  + someId + '/found_grand_prices').doc(someId);
  await assertFails(doc.set({data:'new data'}));
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
// Use Case #10b On A Use Case Diagram.
it('Admin: Do not allow admins to create grand prices for a found store.', async()=>{

  const doc = adminUser.firestore().collection('found_stores_with_competition/' 
  + someId + '/found_grand_prices').doc(someId);
  await assertFails(doc.set({data:'new data'}));
}); // Working As Expected.




// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
// Use Case #10b On A Use Case Diagram.
it('Offline User: Do not allow not logged in users to delete grand prices for a found store.', async()=>{

  const doc = noUser.firestore().collection('found_stores_with_competition/' 
  + someId + '/found_grand_prices').doc(someId);
  await assertFails(doc.delete());
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
// Use Case #10b On A Use Case Diagram.
it('Online User: Do not allow logged in users to delete grand prices for a found store.', async()=>{

  const doc = myUser.firestore().collection('found_stores_with_competition/' 
  + someId + '/found_grand_prices').doc(someId);
  await assertFails(doc.delete());
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
// Use Case #10b On A Use Case Diagram.
it('Store Owner: Do not allow store owners to delete grand prices for a found store.', async()=>{

  const doc = storeOwnerUser.firestore().collection('found_stores_with_competition/' 
  + someId + '/found_grand_prices').doc(someId);
  await assertFails(doc.delete());
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
// Use Case #10b On A Use Case Diagram.
it('Admin: Do not allow admins to delete grand prices for a found store.', async()=>{

  const doc = adminUser.firestore().collection('found_stores_with_competition/' 
  + someId + '/found_grand_prices').doc(someId);
  await assertFails(doc.delete());
}); // Working As Expected.




/*
// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
it('Offline User: Do not allow not logged in users to update grand prices for a found store.', async()=>{

  const foundStore = {
    storeName:'store abc',
    sectionName: 'mashu',
    storeFK:'store_id',
  };

  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition')
    .doc(foundStore.storeFK).set(foundStore);
  });


  const doc = noUser.firestore().collection('found_stores_with_competition')
  .doc(someId).collection('found_grand_prices').doc(foundStore.storeFK);

  await assertFails(doc.update({storeName:'new data'}));
}); 

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
it('Online User: Do not allow logged in users to update grand prices for a found store.', async()=>{

  const foundStore = {
    storeName:'store abc',
    sectionName: 'mashu',
    storeFK:'store_id',
  };

  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition')
    .doc(foundStore.storeFK).set(foundStore);
  });


  const doc = myUser.firestore().collection('found_stores_with_competition')
  .doc(someId).collection('found_grand_prices').doc(foundStore.storeFK);

  await assertFails(doc.update({storeName:'new data'}));
}); 

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
it('Store Owner: Do not allow store owners to update grand prices for a found store.', async()=>{

  const foundStore = {
    storeName:'store abc',
    sectionName: 'mashu',
    storeFK:'store_id',
  };

  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition')
    .doc(foundStore.storeFK).set(foundStore);
  });


  const doc = storeOwnerUser.firestore().collection('found_stores_with_competition')
  .doc(someId).collection('found_grand_prices').doc(foundStore.storeFK);

  await assertFails(doc.update({storeName:'new data'}));
}); 

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
it('Admin: Do not allow admins to update grand prices for a found store.', async()=>{

  const foundStore = {
    storeName:'store abc',
    sectionName: 'mashu',
    storeFK:'store_id',
  };

  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition')
    .doc(foundStore.storeFK).set(foundStore);
  });


  const doc = adminUser.firestore().collection('found_stores_with_competition')
  .doc(someId).collection('found_grand_prices').doc(foundStore.storeFK);

  await assertFails(doc.update({storeName:'new data'}));
}); 
*/



// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Offline User: Do not allow not logged in users to see grand prices not corresponding to a competition that they are currently viewing.', async()=>{

  const foundStoreId = 'foundStoreXYZ';

  const foundStoreWithCompetition = {
    foundStoresWithCompetitionId: foundStoreId,
  };

  const foundGrandPriceId = 'foundGrandPriceXYZ';
  const foundGrandPrice = {
    owningStoreFK: 'foundStoreABC',
    foundStoreGrandPriceId:foundGrandPriceId,
  };

  // Save found store with competition to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition')
    .doc(foundStoreId).set(foundStoreWithCompetition);
  });

  // Save found grand price to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition/' 
    + foundStoreId + '/found_grand_prices').doc(foundGrandPriceId).set(foundGrandPrice);
  });

  const doc = noUser.firestore().collection('found_stores_with_competition/' 
  + foundStoreId + '/found_grand_prices').doc(foundGrandPriceId);
  await assertFails(doc.get());
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Online User: Do not allow logged in users to see grand prices not corresponding to a competition that they are currently viewing.', async()=>{

  const foundStoreId = 'foundStoreXYZ';
  const foundStoreWithCompetition = {
    foundStoresWithCompetitionId: foundStoreId,
  };

  const foundGrandPriceId = 'foundGrandPriceXYZ';
  const foundGrandPrice = {
    owningStoreFK: 'foundStoreABC',
    foundStoreGrandPriceId:foundGrandPriceId,
  };

  // Save found store with competition to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition')
    .doc(foundStoreId).set(foundStoreWithCompetition);
  });

  // Save found grand price to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition/' 
    + foundStoreId + '/found_grand_prices').doc(foundGrandPriceId).set(foundGrandPrice);
  });

  const doc = myUser.firestore().collection('found_stores_with_competition/' 
  + foundStoreId + '/found_grand_prices').doc(foundGrandPriceId);
  await assertFails(doc.get());
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Store Owner: Do not allow store owners to see grand prices not corresponding to a competition that they are currently viewing.', async()=>{

  const foundStoreId = 'foundStoreXYZ';
  const foundStoreWithCompetition = {
    foundStoresWithCompetitionId: foundStoreId,
  };

  const foundGrandPriceId = 'foundGrandPriceXYZ';
  const foundGrandPrice = {
    owningStoreFK: 'foundStoreABC',
    foundStoreGrandPriceId:foundGrandPriceId,
  };

  // Save found store with competition to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition')
    .doc(foundStoreId).set(foundStoreWithCompetition);
  });

  // Save found grand price to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition/' 
    + foundStoreId + '/found_grand_prices').doc(foundGrandPriceId).set(foundGrandPrice);
  });

  const doc = storeOwnerUser.firestore().collection('found_stores_with_competition/' 
  + foundStoreId + '/found_grand_prices').doc(foundGrandPriceId);
  await assertFails(doc.get());
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Admin: Do not allow admins to see grand prices not corresponding to a competition that they are currently viewing.', async()=>{

  const foundStoreId = 'foundStoreXYZ';
  const foundStoreWithCompetition = {
    foundStoresWithCompetitionId: foundStoreId,
  };

  const foundGrandPriceId = 'foundGrandPriceXYZ';
  const foundGrandPrice = {
    owningStoreFK: 'foundStoreABC',
    foundStoreGrandPriceId:foundGrandPriceId,
  };

  // Save found store with competition to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition')
    .doc(foundStoreId).set(foundStoreWithCompetition);
  });

  // Save found grand price to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition/' 
    + foundStoreId + '/found_grand_prices').doc(foundGrandPriceId).set(foundGrandPrice);
  });

  const doc = adminUser.firestore().collection('found_stores_with_competition/' 
  + foundStoreId + '/found_grand_prices').doc(foundGrandPriceId);
  await assertFails(doc.get());
}); // Working As Expected.



// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Offline User: Allow not logged in users to see grand prices corresponding to a competition that they are currently viewing.', async()=>{

  const foundStoreId = 'foundStoreXYZ';

  const foundStoreWithCompetition = {
    foundStoresWithCompetitionId: foundStoreId,
  };

  const foundGrandPriceId = 'foundGrandPriceXYZ';

  const foundGrandPrice = {
    owningStoreFK: foundStoreId,
    foundStoreGrandPriceId:foundGrandPriceId,
  };

  // Save found store with competition to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition')
    .doc(foundStoreId).set(foundStoreWithCompetition);
  });

  // Save found grand price to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition')
    .doc(foundStoreId).collection('found_grand_prices').doc(foundGrandPriceId)
    .set(foundGrandPrice);
  });

  const doc = noUser.firestore().collection('found_stores_with_competition')
  .doc(foundStoreId).collection('found_grand_prices').doc(foundGrandPriceId);
  await assertSucceeds(doc.get());
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Online User: Allow logged in users to see grand prices corresponding to a competition that they are currently viewing.', async()=>{

  const foundStoreId = 'foundStoreXYZ';
  const foundStoreWithCompetition = {
    foundStoresWithCompetitionId: foundStoreId,
  };

  const foundGrandPriceId = 'foundGrandPriceXYZ';
  const foundGrandPrice = {
    owningStoreFK: foundStoreId,
    foundStoreGrandPriceId:foundGrandPriceId,
  };

  // Save found store with competition to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition')
    .doc(foundStoreId).set(foundStoreWithCompetition);
  });

  // Save found grand price to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition/' 
    + foundStoreId + '/found_grand_prices').doc(foundGrandPriceId).set(foundGrandPrice);
  });

  const doc = myUser.firestore().collection('found_stores_with_competition/' 
  + foundStoreId + '/found_grand_prices').doc(foundGrandPriceId);
  await assertSucceeds(doc.get());
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Store Owner: Allow store owners to see grand prices corresponding to a competition that they are currently viewing.', async()=>{

  const foundStoreId = 'foundStoreXYZ';
  const foundStoreWithCompetition = {
    foundStoresWithCompetitionId: foundStoreId,
  };

  const foundGrandPriceId = 'foundGrandPriceXYZ';
  const foundGrandPrice = {
    owningStoreFK: foundStoreId,
    foundStoreGrandPriceId:foundGrandPriceId,
  };

  // Save found store with competition to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition')
    .doc(foundStoreId).set(foundStoreWithCompetition);
  });

  // Save found grand price to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition/' 
    + foundStoreId + '/found_grand_prices').doc(foundGrandPriceId).set(foundGrandPrice);
  });

  const doc = storeOwnerUser.firestore().collection('found_stores_with_competition/' 
  + foundStoreId + '/found_grand_prices').doc(foundGrandPriceId);
  await assertSucceeds(doc.get());
}); // Working As Expected.

// Testing /found_stores_with_competition/{foundStoresWithCompetitionId}/found_grand_prices/{foundGrandPriceId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Admin: Allow admins to see grand prices corresponding to a competition that they are currently viewing.', async()=>{

  const foundStoreId = 'foundStoreXYZ';
  const foundStoreWithCompetition = {
    foundStoresWithCompetitionId: foundStoreId,
  };

  const foundGrandPriceId = 'foundGrandPriceXYZ';
  const foundGrandPrice = {
    owningStoreFK: foundStoreId,
    foundStoreGrandPriceId:foundGrandPriceId,
  };

  // Save found store with competition to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition')
    .doc(foundStoreId).set(foundStoreWithCompetition);
  });

  // Save found grand price to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_competition/' 
    + foundStoreId + '/found_grand_prices').doc(foundGrandPriceId).set(foundGrandPrice);
  });

  const doc = adminUser.firestore().collection('found_stores_with_competition/' 
  + foundStoreId + '/found_grand_prices').doc(foundGrandPriceId);
  await assertSucceeds(doc.get());
}); // Working As Expected.



// Testing /found_stores_with_winner/{foundStoresWithWinnerId}
// Use Case #10c On A Use Case Diagram.
it('Offline User : Do not allow not logged in users to create stores with winner.', async()=>{

  const doc = noUser.firestore().collection('found_stores_with_winner').doc(someId);
  await assertFails(doc.set({new:'new store'}));
      
}); // Working As Expected.

// Testing /found_stores_with_winner/{foundStoresWithWinnerId}
// Use Case #10c On A Use Case Diagram.
it('Online User : Do not allow logged in users to create stores with winner.', async()=>{

  const doc = myUser.firestore().collection('found_stores_with_winner').doc(someId);
  await assertFails(doc.set({new:'new store'}));
      
}); // Working As Expected.

// Testing /found_stores_with_winner/{foundStoresWithWinnerId}
// Use Case #10c On A Use Case Diagram.
it('Store Owner : Do not allow store owners to create stores with winner.', async()=>{

  const doc = storeOwnerUser.firestore().collection('found_stores_with_winner').doc(someId);
  await assertFails(doc.set({new:'new store'}));
      
}); // Working As Expected.

// Testing /found_stores_with_winner/{foundStoresWithWinnerId}
// Use Case #10c On A Use Case Diagram.
it('Admin : Do not allow admins to create stores with winner.', async()=>{

  const doc = adminUser.firestore().collection('found_stores_with_winner').doc(someId);
  await assertFails(doc.set({new:'new store'}));
      
}); // Working As Expected.


/*
// Testing /found_stores_stores_with_winner/{foundStoresWithWinnerId}
it('Offline User : Do not allow not logged in users to update a store with winner.', async()=>{

  const foundStoreWithWinner = {
    storeId: 'store_abc',
    storeName: 'Six To Six',
  };

  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_winner')
    .doc(foundStoreWithWinner.storeId).set(foundStoreWithWinner);
  });

  const doc = noUser.firestore().collection('found_stores_with_winner')
  .doc(foundStoreWithWinner.storeId);
  await assertFails(doc.update({storeName:'new store name'}));
      
}); // Working As Expected.

// Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
it('Online User : Do not allow logged in users to update a store with winner.', async()=>{

  const foundStoreWithWinner = {
    storeId: 'store_abc',
    storeName: 'Six To Six',
  };

  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_winner')
    .doc(foundStoreWithWinner.storeId).set(foundStoreWithWinner);
  });

  const doc = myUser.firestore().collection('found_stores_with_winner')
  .doc(foundStoreWithWinner.storeId);
  await assertFails(doc.update({storeName:'new store name'}));
      
}); // Working As Expected.

// Testing /found_stores_with_winner/{foundStoresWithWinnerId}
it('Store Owner : Do not allow store owners to update a store with winner.', async()=>{

  const foundStoreWithWinner = {
    storeId: 'store_abc',
    storeName: 'Six To Six',
  };

  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_winner')
    .doc(foundStoreWithWinner.storeId).set(foundStoreWithWinner);
  });

  const doc = storeOwnerUser.firestore().collection('found_stores_with_winner')
  .doc(foundStoreWithWinner.storeId);
  await assertFails(doc.update({storeName:'new store name'}));
      
}); // Working As Expected.

// Testing /found_stores_with_winner/{foundStoresWithWinnerId}
it('Admin : Do not allow admins to update a store with winner.', async()=>{

  const foundStoreWithWinner = {
    storeId: 'store_abc',
    storeName: 'Six To Six',
  };

  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_with_winner')
    .doc(foundStoreWithWinner.storeId).set(foundStoreWithWinner);
  });

  const doc = adminUser.firestore().collection('found_stores_with_winner')
  .doc(foundStoreWithWinner.storeId);
  await assertFails(doc.update({storeName:'new store name'}));
      
}); // Working As Expected.
*/



// Testing /found_stores_with_winner/{foundStoresWithWinnerId}
// Use Case #10c On A Use Case Diagram.
it('Offline User : Do not allow not logged in users to delete a store with winner.', async()=>{

  const doc = noUser.firestore().collection('found_stores_with_winner').doc(someId);
  await assertFails(doc.delete());
      
}); // Working As Expected.

// Testing /found_stores_with_winner/{foundStoresWithWinnerId}
// Use Case #10c On A Use Case Diagram.
it('Online User : Do not allow logged in users to delete a store with winner.', async()=>{

  const doc = myUser.firestore().collection('found_stores_with_winner').doc(someId);
  await assertFails(doc.delete());
      
}); // Working As Expected.

// Testing /found_stores_with_winner/{foundStoresWithWinnerId}
// Use Case #10c On A Use Case Diagram.
it('Store Owner : Do not allow store owners to delete a store with winner.', async()=>{

  const doc = storeOwnerUser.firestore().collection('found_stores_with_winner').doc(someId);
  await assertFails(doc.delete());
      
}); // Working As Expected.

// Testing /found_stores_with_winner/{foundStoresWithWinnerId}
// Use Case #10c On A Use Case Diagram.
it('Admin : Do not allow admins to delete a store with winner.', async()=>{

  const doc = adminUser.firestore().collection('found_stores_with_winner').doc(someId);
  await assertFails(doc.delete());
      
}); // Working As Expected.



// Testing /found_stores_with_winner/{foundStoresWithWinnerId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Offline User : Allow not logged in users to search for stores with winner.', async()=>{

  const query = noUser.firestore().collection('found_stores_with_winner');
  await assertSucceeds(query.get());
      
}); 

// Testing /found_stores_with_winner/{foundStoresWithWinnerId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Online User : Allow logged in users to search for stores with winner.', async()=>{

  const query = myUser.firestore().collection('found_stores_with_winner');
  await assertSucceeds(query.get());
      
}); 

// Testing /found_stores_with_winner/{foundStoresWithWinnerId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Store Owner : Allow store owners to search for stores with winner.', async()=>{

  const query = storeOwnerUser.firestore().collection('found_stores_with_winner');
  await assertSucceeds(query.get());
      
}); 

// Testing /found_stores_with_winner/{foundStoresWithWinnerId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Admin : Allow admins to search for stores with winner.', async()=>{

  const query = adminUser.firestore().collection('found_stores_with_winner');
  await assertSucceeds(query.get());
      
}); 



// Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
// Use Case #10a On A Use Case Diagram.
it('Offline User : Do not allow not logged in users to create a store without competitions.', async()=>{

  const doc = noUser.firestore().collection('found_stores_without_competition').doc(someId);
  await assertFails(doc.set({new:'new store'}));
      
}); // Working As Expected.

// Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
// Use Case #10a On A Use Case Diagram.
it('Online User : Do not allow logged in users to create a store without competitions.', async()=>{

  const doc = myUser.firestore().collection('found_stores_without_competition').doc(someId);
  await assertFails(doc.set({new:'new store'}));
      
}); // Working As Expected.

// Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
// Use Case #10a On A Use Case Diagram.
it('Store Owner : Do not allow store owners to create a store without competitions.', async()=>{

  const doc = storeOwnerUser.firestore().collection('found_stores_without_competition').doc(someId);
  await assertFails(doc.set({new:'new store'}));
      
}); // Working As Expected.

// Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
// Use Case #10a On A Use Case Diagram.
it('Admin : Do not allow admins to create a store without competitions.', async()=>{

  const doc = adminUser.firestore().collection('found_stores_without_competition').doc(someId);
  await assertFails(doc.set({new:'new store'}));
      
}); // Working As Expected.




/*
// Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
it('Offline User : Do not allow not logged in users to update a store without competitions.', async()=>{

  const foundStoreWithoutCompetition = {
    storeId: 'store_abc',
    storeName: 'Six To Six',
  };

  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_without_competition')
    .doc(foundStoreWithoutCompetition.storeId).set(foundStoreWithoutCompetition);
  });

  const doc = noUser.firestore().collection('found_stores_without_competition')
  .doc(foundStoreWithoutCompetition.storeId);
  await assertFails(doc.update({storeName:'new store name'}));
      
}); // Working As Expected.

// Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
it('Online User : Do not allow logged in users to update a store without competitions.', async()=>{

  const foundStoreWithoutCompetition = {
    storeId: 'store_abc',
    storeName: 'Six To Six',
  };

  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_without_competition')
    .doc(foundStoreWithoutCompetition.storeId).set(foundStoreWithoutCompetition);
  });

  const doc = myUser.firestore().collection('found_stores_without_competition')
  .doc(foundStoreWithoutCompetition.storeId);
  await assertFails(doc.update({storeName:'new store name'}));
      
}); // Working As Expected.

// Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
it('Store Owner : Do not allow store owners to update a store without competitions.', async()=>{

  const foundStoreWithoutCompetition = {
    storeId: 'store_abc',
    storeName: 'Six To Six',
  };

  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_without_competition')
    .doc(foundStoreWithoutCompetition.storeId).set(foundStoreWithoutCompetition);
  });

  const doc = storeOwnerUser.firestore().collection('found_stores_without_competition')
  .doc(foundStoreWithoutCompetition.storeId);
  await assertFails(doc.update({storeName:'new store name'}));
      
}); // Working As Expected.

// Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
it('Admin : Do not allow admins to update a store without competitions.', async()=>{

  const foundStoreWithoutCompetition = {
    storeId: 'store_abc',
    storeName: 'Six To Six',
  };

  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('found_stores_without_competition')
    .doc(foundStoreWithoutCompetition.storeId).set(foundStoreWithoutCompetition);
  });

  const doc = adminUser.firestore().collection('found_stores_without_competition')
  .doc(foundStoreWithoutCompetition.storeId);
  await assertFails(doc.update({storeName:'new store name'}));
      
}); // Working As Expected.
*/


// Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
// Use Case #10a On A Use Case Diagram.
it('Offline User : Do not allow not logged in users to delete a store without competitions.', async()=>{

  const doc = noUser.firestore().collection('found_stores_without_competition').doc(someId);
  await assertFails(doc.delete());
      
}); // Working As Expected.

// Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
// Use Case #10a On A Use Case Diagram.
it('Online User : Do not allow logged in users to delete a store without competitions.', async()=>{

  const doc = myUser.firestore().collection('found_stores_without_competition').doc(someId);
  await assertFails(doc.delete());
      
}); // Working As Expected.

// Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
// Use Case #10a On A Use Case Diagram.
it('Store Owner : Do not allow store owners to delete a store without competitions.', async()=>{

  const doc = storeOwnerUser.firestore().collection('found_stores_without_competition').doc(someId);
  await assertFails(doc.delete());
      
}); // Working As Expected.

// Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
// Use Case #10a On A Use Case Diagram.
it('Admin : Do not allow admins to delete a store without competitions.', async()=>{

  const doc = adminUser.firestore().collection('found_stores_without_competition').doc(someId);
  await assertFails(doc.delete());
      
}); // Working As Expected.



// Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Offline User : Allow not logged in users to search for stores without competitions.', async()=>{

  const query = noUser.firestore().collection('found_stores_without_competition');
  await assertSucceeds(query.get());
      
}); // Working As Expected.

// Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Online User : Allow logged in users to search for stores without competitions.', async()=>{

  const query = myUser.firestore().collection('found_stores_without_competition');
  await assertSucceeds(query.get());
      
}); // Working As Expected.

// Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Store Owner : Allow store owners to search for stores without competitions.', async()=>{

  const query = storeOwnerUser.firestore().collection('found_stores_without_competition');
  await assertSucceeds(query.get());
      
}); // Working As Expected.

// Testing /found_stores_without_competition/{foundStoresWithoutCompetitionId}
// Use Case #10d, #11 On A Use Case Diagram.
it('Admin : Allow admins to search for stores without competitions.', async()=>{

  const query = adminUser.firestore().collection('found_stores_without_competition');
  await assertSucceeds(query.get());
      
}); // Working As Expected.




// Testing /all_alcohol/{alcoholId}
// Use Case #0.1a On A Use Case Diagram.
it('Offline User : Do not allow not logged in users to add new alcohol into the system.', async()=>{

  const doc = noUser.firestore().collection('all_alcohol').doc(someId);
  await assertFails(doc.set({foo:'xxx'}));
      
}); // Working As Expected.

// Testing /all_alcohol/{alcoholId}
// Use Case #0.1a On A Use Case Diagram.
it('Online User : Do not allow logged in users to add new alcohol into the system.', async()=>{

  const doc = myUser.firestore().collection('all_alcohol').doc(someId);
  await assertFails(doc.set({foo:'xxx'}));
      
}); // Working As Expected.

// Testing /all_alcohol/{alcoholId}
// Use Case #0.1a On A Use Case Diagram.
it('Store Owner : Do not allow store owners to add new alcohol in the system.', async()=>{

  const doc = storeOwnerUser.firestore().collection('all_alcohol').doc(someId);
  await assertFails(doc.set({foo:'xxx'}));
      
}); // Working As Expected.

// Testing /all_alcohol/{alcoholId}
// Use Case #0.1a On A Use Case Diagram.
it('Admin : Only allow admins to add new alcohol in the system.', async()=>{

  const doc = adminUser.firestore().collection('all_alcohol').doc(someId);
  await assertSucceeds(doc.set({foo:'xxx'}));
      
}); // Working As Expected.



// Testing /all_alcohol/{alcoholId}
// Use Case #0.2a On A Use Case Diagram.
it('Offline User : Do not allow not logged in users to view alcohol from all_alcohol collection.', async()=>{

  const doc = noUser.firestore().collection('all_alcohol').doc(someId);
  await assertFails(doc.get());
      
}); // Working As Expected.

// Testing /all_alcohol/{alcoholId}
// Use Case #0.2a On A Use Case Diagram.
it('Online User : Do not allow logged in users to view alcohol from all_alcohol collection.', async()=>{

  const doc = myUser.firestore().collection('all_alcohol').doc(someId);
  await assertFails(doc.get());
      
}); // Working As Expected.

// Testing /all_alcohol/{alcoholId}
// Use Case #0.2a On A Use Case Diagram.
it('Store Owner : Allow store owners to view alcohol from all_alcohol collection.', async()=>{

  const doc = storeOwnerUser.firestore().collection('all_alcohol').doc(someId);
  await assertSucceeds(doc.get());
      
}); // Working As Expected.

// Testing /all_alcohol/{alcoholId}
// Use Case #0.2a On A Use Case Diagram.
it('Allow admins to view alcohol from all_alcohol collection.', async()=>{

  const doc = adminUser.firestore().collection('all_alcohol').doc(someId);
  await assertSucceeds(doc.get());
      
}); // Working As Expected.




// Testing /all_alcohol/{alcoholId}
// Use Case #0.3a On A Use Case Diagram.
it('Offline User : Do not allow not logged in users to update alcohol from the all_alcohol collection.', async()=>{

  const alcohol = {
    alcoholId: someId,
    fullname:'savana'

  };

  // Save alcohol to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('all_alcohol')
    .doc(alcohol.alcoholId).set(alcohol);
  });

  const doc = noUser.firestore().collection('all_alcohol'
  ).doc(alcohol.alcoholId);
  await assertFails(doc.update({fullname:'castle'}));
      
}); // Working As Expected.

// Testing /all_alcohol/{alcoholId}
// Use Case #0.3a On A Use Case Diagram.
it('Online User : Do not allow logged in users to update alcohol from the all_alcohol collection.', async()=>{

  const alcohol = {
    alcoholId: someId,
    fullname:'savana'

  };

  // Save alcohol to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('all_alcohol')
    .doc(alcohol.alcoholId).set(alcohol);
  });

  const doc = myUser.firestore().collection('all_alcohol'
  ).doc(alcohol.alcoholId);
  await assertFails(doc.update({fullname:'castle'}));
      
}); // Working As Expected.

// Testing /all_alcohol/{alcoholId}
// Use Case #0.3a On A Use Case Diagram.
it('Store Owner : Do not allow store owners to update alcohol from the all_alcohol collection.', async()=>{

  const alcohol = {
    alcoholId: someId,
    fullname:'savana'

  };

  // Save alcohol to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('all_alcohol')
    .doc(alcohol.alcoholId).set(alcohol);
  });

  const doc = storeOwnerUser.firestore().collection('all_alcohol'
  ).doc(alcohol.alcoholId);
  await assertFails(doc.update({fullname:'castle'}));
      
}); // Working As Expected.

// Testing /all_alcohol/{alcoholId}
// Use Case #0.3a On A Use Case Diagram.
it('Admin : Only allow admins to update alcohol from the all_alcohol collection.', async()=>{

  const alcohol = {
    alcoholId: someId,
    fullname:'savana'

  };

  // Save alcohol to refer to.
  await testEnv.withSecurityRulesDisabled(context =>{
    return context.firestore().collection('all_alcohol')
    .doc(alcohol.alcoholId).set(alcohol);
  });

  const doc = adminUser.firestore().collection('all_alcohol'
  ).doc(alcohol.alcoholId);
  await assertSucceeds(doc.update({fullname:'castle'}));
      
}); // Working As Expected.



// Testing /all_alcohol/{alcoholId}
// Use Case #0.4a On A Use Case Diagram.
it('Offline User : Do not allow not logged in users to delete alcohol from the all_alcohol collection.', async()=>{

  const doc = noUser.firestore().collection('all_alcohol'
  ).doc(someId);
  await assertFails(doc.delete());
      
}); // Working As Expected.

// Testing /all_alcohol/{alcoholId}
// Use Case #0.4a On A Use Case Diagram.
it('Online User : Do not allow logged in users to delete alcohol from the all_alcohol collection.', async()=>{

  const doc = myUser.firestore().collection('all_alcohol'
  ).doc(someId);
  await assertFails(doc.delete());
      
}); // Working As Expected.

// Testing /all_alcohol/{alcoholId}
// Use Case #0.4a On A Use Case Diagram.
it('Store Owner : Do not allow store owners to delete alcohol from the all_alcohol collection.', async()=>{

  const doc = storeOwnerUser.firestore().collection('all_alcohol'
  ).doc(someId);
  await assertFails(doc.delete());
      
}); // Working As Expected.

// Testing /all_alcohol/{alcoholId}
// Use Case #0.4a On A Use Case Diagram.
it('Admin : Only allow admins to delete alcohol from the all_alcohol collection.', async()=>{

  const doc = adminUser.firestore().collection('all_alcohol'
  ).doc(someId);
  await assertSucceeds(doc.delete());
      
}); // Working As Expected.


  /*
  // Testing /available_alcohol/{alcoholId}
  it('Offline User : Do not allow not logged in users to add new available alcohol into the system.', async()=>{

    const doc = noUser.firestore().collection('available_alcohol').doc(someId);
    await assertFails(doc.set({foo:'xxx'}));
        
  }); // Working As Expected.
  
  // Testing /available_alcohol/{alcoholId}
  it('Online User : Do not allow logged in users to add new available alcohol into the system.', async()=>{

    const doc = myUser.firestore().collection('available_alcohol').doc(someId);
    await assertFails(doc.set({foo:'xxx'}));
        
  }); // Working As Expected.
  
  // Testing /available_alcohol/{alcoholId}
  it('Store Owner : Do not allow store owners to add new available alcohol into the system.', async()=>{

    const doc = storeOwnerUser.firestore().collection('available_alcohol').doc(someId);
    await assertFails(doc.set({foo:'xxx'}));
        
  }); // Working As Expected.
  
  // Testing /available_alcohol/{alcoholId}
  it('Admin : Do not allow admin to add new available alcohol into the system.', async()=>{

    const doc = adminUser.firestore().collection('available_alcohol').doc(someId);
    await assertFails(doc.set({foo:'xxx'}));
        
  }); // Working As Expected.
  

  
  // Testing /available_alcohol/{alcoholId}
  it('Offline User : Do not allow not logged in users to update available alcohol.', async()=>{

    const alcohol = {
      alcoholId: 'alcohol_abc',
      price: 5,

    }

    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('available_alcohol')
      .doc(alcohol.alcoholId).set(alcohol);
    });

    const doc = noUser.firestore().collection('available_alcohol').doc(alcohol.alcoholId);
    await assertFails(doc.update({price:10}));
        
  }); // Working As Expected.
  
  // Testing /available_alcohol/{alcoholId}
  it('Online User : Do not allow logged in users to update available alcohol.', async()=>{

    const alcohol = {
      alcoholId: 'alcohol_abc',
      price: 5,

    }

    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('available_alcohol')
      .doc(alcohol.alcoholId).set(alcohol);
    });

    const doc = myUser.firestore().collection('available_alcohol').doc(alcohol.alcoholId);
    await assertFails(doc.update({price:10}));
        
  }); // Working As Expected.
  
  // Testing /available_alcohol/{alcoholId}
  it('Store Owner : Do not allow store owners to update available alcohol.', async()=>{

    const alcohol = {
      alcoholId: 'location_abc',
      price: 5,

    }

    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('available_alcohol')
      .doc(alcohol.alcoholId).set(alcohol);
    });

    const doc = storeOwnerUser.firestore().collection('available_alcohol').doc(alcohol.alcoholId);
    await assertFails(doc.update({price:10}));
        
  }); // Working As Expected.
  
  // Testing /available_alcohol/{alcoholId}
  it('Admin : Allow admins to update available alcohol.', async()=>{

    const alcohol = {
      alcoholId: 'location_abc',
      price: 5,

    }

    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('available_alcohol')
      .doc(alcohol.alcoholId).set(alcohol);
    });

    const doc = adminUser.firestore().collection('available_alcohol').doc(alcohol.alcoholId);
    await assertSucceeds(doc.update({price:10}));
        
  }); // Working As Expected.
  
  
  
  // Testing /available_alcohol/{alcoholId}
  it('Offline User : Allow not logged in users to view alcohol from available_alcohol collection.', async()=>{

    const doc = noUser.firestore().collection('available_alcohol').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.
  
  // Testing /available_alcohol/{alcoholId}
  it('Online User : Allow logged in users to view alcohol from available_alcohol collection.', async()=>{

    const doc = myUser.firestore().collection('available_alcohol').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.
  
  // Testing /available_alcohol/{locationId}
  it('Store Owner : Allow store owners to view alcohol from available_alcohol collection.', async()=>{

    const doc = storeOwnerUser.firestore()
    .collection('available_alcohol').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.
  
  // Testing /available_alcohol/{alcoholId}
  it('Admin : Allow admins to view alcohol from available_alcohol collection.', async()=>{

    const doc = adminUser.firestore().collection('available_alcohol').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.
  */

  
  // Testing /all_locations/{locationId}
  // Use Case #0.1b On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to add new location into the system.', async()=>{

    const doc = noUser.firestore().collection('all_locations').doc(someId);
    await assertFails(doc.set({foo:'xxx'}));
        
  }); // Working As Expected.

  // Testing /all_locations/{locationId}
  // Use Case #0.1b On A Use Case Diagram.
  it('Online User : Do not allow logged in users to add new location into the system.', async()=>{

    const doc = myUser.firestore().collection('all_locations').doc(someId);
    await assertFails(doc.set({foo:'xxx'}));
        
  }); // Working As Expected.
  
  // Testing /all_location/{locationlId}
  // Use Case #0.1b On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to add new location in the system.', async()=>{

    const doc = storeOwnerUser.firestore().collection('all_locations').doc(someId);
    await assertFails(doc.set({foo:'xxx'}));
        
  }); // Working As Expected.
  
  // Testing /all_locations/{locationId}
  // Use Case #0.1b On A Use Case Diagram.
  it('Admin : Only allow admins to add new location in the system.', async()=>{

    const doc = adminUser.firestore().collection('all_locations').doc(someId);
    await assertSucceeds(doc.set({foo:'xxx'}));
        
  }); // Working As Expected.
  
  
  // Testing /all_locations/{locationId}
  // Use Case #0.2b On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to view locations from all_locations collection.', async()=>{

    const doc = noUser.firestore().collection('all_locations').doc(someId);
    await assertFails(doc.get());
        
  }); // Working As Expected.

  // Testing /all_locations/{locationId}
  // Use Case #0.2b On A Use Case Diagram.
  it('Online User : Do not allow logged in users to view locations from all_locations collection.', async()=>{

    const doc = myUser.firestore().collection('all_locations').doc(someId);
    await assertFails(doc.get());
        
  }); // Working As Expected.
  
   // Testing /all_locations/{locationId}
   // Use Case #0.2b On A Use Case Diagram.
   it('Store Owner : Allow store owners to view locations from all_locations collection.', async()=>{

    const doc = storeOwnerUser.firestore().collection('all_locations').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.
     
  // Testing /all_locations/{locationId}
  // Use Case #0.2b On A Use Case Diagram.
  it('Admin : Allow admins to view locations from all_locations collection.', async()=>{

    const doc = adminUser.firestore().collection('all_locations').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.
  

  /*
  //  Testing /all_locations/{locationId}
  // Use Case #0.3b On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to update a document from all_locations.', async()=>{

    const location = {
      locationId : 'location_abc',
      townshipOrSurbub : 'Umlazi K'
    }

    // Save location to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('all_locations')
      .doc(location.locationId).set(location);
    });

    const doc = noUser.firestore().collection('all_locations').doc(location.locationId);
    await assertFails(doc.update({townshipOrSurbub:'new value'}));
        
  }); // Working As Expected.

  //  Testing /all_locations/{locationId}
  // Use Case #0.3b On A Use Case Diagram.
  it('Online User : Do not allow logged in users to update a document from all_locations.', async()=>{

    const location = {
      locationId : 'location_abc',
      townshipOrSurbub : 'Umlazi K'
    }

    // Save location to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('all_locations')
      .doc(location.locationId).set(location);
    });

    const doc = myUser.firestore().collection('all_locations').doc(location.locationId);
    await assertFails(doc.update({townshipOrSurbub:'new value'}));
        
  }); // Working As Expected.

  //  Testing /all_locations/{locationId}
  // Use Case #0.3b On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to update a document from all_locations.', async()=>{

    const location = {
      locationId : 'location_abc',
      townshipOrSurbub : 'Umlazi K'
    }

    // Save location to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('all_locations')
      .doc(location.locationId).set(location);
    });

    const doc = storeOwnerUser.firestore().collection('all_locations').doc(location.locationId);
    await assertFails(doc.update({townshipOrSurbub:'new value'}));
        
  }); // Working As Expected.
   
  //  Testing /all_locations/{locationId}
  // Use Case #0.3b On A Use Case Diagram.
  it('Admin : Only allow admins to update a document from all_locations.', async()=>{

    const location = {
      locationId : 'location_abc',
      townshipOrSurbub : 'Umlazi K'
    }

    // Save location to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('all_locations')
      .doc(location.locationId).set(location);
    });

    const doc = adminUser.firestore().collection('all_locations').doc(location.locationId);
    await assertSucceeds(doc.update({townshipOrSurbub:'new value'}));
        
  }); // Working As Expected.
  

  /*
  // Testing /available_locations/{locationId}
  it('Offline User : Do not allow not logged in users to add new location into the system.', async()=>{

    const doc = noUser.firestore().collection('available_locations').doc(someId);
    await assertFails(doc.set({foo:'xxx'}));
        
  }); // Working As Expected.

  // Testing /available_locations/{locationId}
  it('Online User : Do not allow logged in users to add new location into the system.', async()=>{

    const doc = myUser.firestore().collection('available_locations').doc(someId);
    await assertFails(doc.set({foo:'xxx'}));
        
  }); // Working As Expected.

  // Testing /available_locations/{locationId}
  it('Store Owner : Do not allow store owners to add new location into the system.', async()=>{

    const doc = storeOwnerUser.firestore().collection('available_locations').doc(someId);
    await assertFails(doc.set({foo:'xxx'}));
        
  }); // Working As Expected.

  // Testing /available_locations/{locationId}
  it('Admin : Do not allow admin to add new location into the system.', async()=>{

    const doc = adminUser.firestore().collection('available_locations').doc(someId);
    await assertFails(doc.set({foo:'xxx'}));
        
  }); // Working As Expected.
  

  
  // Testing /available_locations/{locationId}
  it('Offline User : Do not allow not logged in users to update available locations.', async()=>{

    const location = {
      locationId: 'location_abc',
      townshipOrSurbub: 'Umlazi C',

    }

    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('available_locations')
      .doc(location.locationId).set(location);
    });

    const doc = noUser.firestore().collection('available_locations').doc(location.locationId);
    await assertFails(doc.update({townshipOrSurbub:'new value'}));
        
  }); // Working As Expected.

  // Testing /available_locations/{locationId}
  it('Online User : Do not allow logged in users to update available locations.', async()=>{

    const location = {
      locationId: 'location_abc',
      townshipOrSurbub: 'Umlazi C',

    }

    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('available_locations')
      .doc(location.locationId).set(location);
    });

    const doc = myUser.firestore().collection('available_locations').doc(location.locationId);
    await assertFails(doc.update({townshipOrSurbub:'new value'}));
        
  }); // Working As Expected.

  // Testing /available_locations/{locationId}
  it('Store Owner : Do not allow store owners to update available locations.', async()=>{

    const location = {
      locationId: 'location_abc',
      townshipOrSurbub: 'Umlazi C',

    }

    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('available_locations')
      .doc(location.locationId).set(location);
    });

    const doc = storeOwnerUser.firestore().collection('available_locations').doc(location.locationId);
    await assertFails(doc.update({townshipOrSurbub:'new value'}));
        
  }); // Working As Expected.

  // Testing /available_locations/{locationId}
  it('Admin : Allow admins to update available locations.', async()=>{

    const location = {
      locationId: 'location_abc',
      townshipOrSurbub: 'Umlazi C',

    }

    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('available_locations')
      .doc(location.locationId).set(location);
    });

    const doc = adminUser.firestore().collection('available_locations').doc(location.locationId);
    await assertSucceeds(doc.update({townshipOrSurbub:'new value'}));
        
  }); // Working As Expected.
  


  
  // Testing /available_locations/{locationId}
  it('Offline User : Allow not logged in users to view locations from available_locations collection.', async()=>{

    const doc = noUser.firestore().collection('available_locations').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.

  // Testing /available_locations/{locationId}
  it('Online User : Allow logged in users to view locations from available_locations collection.', async()=>{

    const doc = myUser.firestore().collection('available_locations').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.
  
  // Testing /available_locations/{locationId}
  it('Store Owner : Allow store owners to view locations from available_locations collection.', async()=>{

    const doc = storeOwnerUser.firestore()
    .collection('available_locations').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.

  // Testing /available_locations/{locationId}
  it('Admin : Allow admins to view locations from available_locations collection.', async()=>{

    const doc = adminUser.firestore().collection('available_locations').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.
  */


  
  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #4 On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to create competitions.', async()=>{

    const doc = noUser.firestore().collection('stores')
    .doc('store_abc').collection('store_competitions')
    .doc(someId);
    await assertFails(doc.set({data:'something'}));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #4 On A Use Case Diagram.
  it('Online User : Do not allow logged in users to create competitions.', async()=>{

    const doc = myUser.firestore().collection('stores')
    .doc('store_abc').collection('store_competitions')
    .doc(someId);
    await assertFails(doc.set({data:'something'}));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #4 On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to create a competition' +
  ' for stores they do not own.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: someId,
    };
    const doc = storeOwnerUser.firestore()
    .collection('stores').doc(store.storeId)
    .collection('store_competitions').doc(competition.competitionId);
    await assertFails(doc.set(competition));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #4 On A Use Case Diagram.
  it('Store Owner : Allow store owners to create a competition' +
  ' for a store they own.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };
    const doc = storeOwnerUser.firestore().collection('stores').doc(store.storeId)
    .collection('store_competitions').doc(competition.competitionId);
    await assertSucceeds(doc.set(competition));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #4 On A Use Case Diagram.
  it('Admin : Do not allow admins to create competitions.', async()=>{

    const doc = adminUser.firestore().collection('stores')
    .doc('store_abc').collection('store_competitions')
    .doc(someId);
    await assertFails(doc.set({data:'something'}));
        
  }); // Working As Expected.
  

  
  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #5a, #5b On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to update competitions.', async()=>{

    const store = {
      storeId: 'store_xxx',

    };

    const competition = {
      competitionId: someId,
      date: '10-11-2023',
      storeFK: store.storeId,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).set(store);
    });

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const doc = noUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId);


    await assertFails(doc.update({date: '12-11-2023'}));
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #5a, #5b On A Use Case Diagram.
  it('Online User : Do not allow logged in users to update competitions.', async()=>{

    const store = {
      storeId: 'store_xxx',

    };

    const competition = {
      competitionId: someId,
      date: '10-11-2023',
      storeFK: store.storeId,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).set(store);
    });

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId);
    await assertFails(doc.update({date: '12-11-2023'}));
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #5a, #5b On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to update competitions they do not own.', async()=>{

    const store = {
      storeId: 'store_xxx',
      storeOwner: theirUserData
    };

    const competition = {
      competitionId: someId,
      date: '10-11-2023',
      storeFK: store.storeId,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).set(store);
    });

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId);
    await assertFails(doc.update({date: '12-11-2023'}));
        
  }); // Working As Expected. 

  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #5a, #5b On A Use Case Diagram.
  it('Store Owner : Allow store owners to update competitions they do not own.', async()=>{

    const store = {
      storeId: 'store_xxx',
      storeOwner: storeOwnerData
    };

    const competition = {
      competitionId: someId,
      date: '10-11-2023',
      storeFK: store.storeId,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).set(store);
    });

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId);
    await assertSucceeds(doc.update({date: '12-11-2023'}));
        
  }); // Working As Expected.


  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #5a, #5b On A Use Case Diagram.
  it('Admin : Do not allow admins to update competitions.', async()=>{

    const store = {
      storeId: 'store_xxx',

    };

    const competition = {
      competitionId: someId,
      date: '10-11-2023',
      storeFK: store.storeId,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).set(store);
    });

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const doc = adminUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId);
    await assertFails(doc.update({date: '12-11-2023'}));
        
  }); // Working As Expected.
  // clear & npm test
  
  
 // Testing /stores/storeId/store_competitions/{competitionId}
 // Use Case #7 On A Use Case Diagram.
 it('Offline User : Allow not logged in users to view a competition.', async()=>{

  const doc = noUser.firestore().collection('stores')
  .doc('store_xxx').collection('store_competitions')
  .doc(someId);
  await assertSucceeds(doc.get());
      
}); // Working As Expected.

// Testing /stores/storeId/store_competitions/{competitionId}
// Use Case #7 On A Use Case Diagram.
it('Online User : Allow logged in users to view a competition.', async()=>{

  const doc = myUser.firestore().collection('stores')
  .doc('store_xxx').collection('store_competitions')
  .doc(someId);
  await assertSucceeds(doc.get());
      
}); // Working As Expected.

// Testing /stores/storeId/store_competitions/{competitionId}
// Use Case #7 On A Use Case Diagram.
it('Store Owner : Allow store owners to view a competition.', async()=>{

  const doc = storeOwnerUser.firestore().collection('stores')
  .doc('store_xxx').collection('store_competitions')
  .doc(someId);
  await assertSucceeds(doc.get());
      
}); // Working As Expected.

// Testing /stores/storeId/store_competitions/{competitionId}
// Use Case #7 On A Use Case Diagram.
it('Admin : Allow admins to view a competition.', async()=>{

  const doc = adminUser.firestore().collection('stores')
  .doc('store_xxx').collection('store_competitions')
  .doc(someId);
  await assertSucceeds(doc.get());
      
}); // Working As Expected.


  
  
  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #7a On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to view a list of competitions.', async()=>{

    const doc = noUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions').doc(someId);

    await assertSucceeds(doc.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #7a On A Use Case Diagram.
  it('Online User : Allow a logged in user to view a store competition.', async()=>{

    const doc = myUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions').doc(someId);

    await assertSucceeds(doc.get());
        
  });

  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #7a On A Use Case Diagram.
  it('Store Owner : Allow store owners to view a store competition.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions').doc(someId);

    await assertSucceeds(doc.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #7a On A Use Case Diagram.
  it('Admin : Allow admins to view a store competitions.', async()=>{

    const doc = adminUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions').doc(someId);

    await assertSucceeds(doc.get());
        
  }); // Working As Expected.
  

  // clear & npm test

  
  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #7a On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to view a list of competitions.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    // Save store joined member to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore()
      .collection('stores').doc(store.storeId)
      .collection('store_joined_members').doc(myUserData.userId)
      .set(myUserData);
    });

    const docs = noUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions');
    await assertFails(docs.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #7a On A Use Case Diagram.
  it('Online User : Do not allow logged in users to view a list of competitions.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const docs = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions');
    
    await assertFails(docs.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #7a On A Use Case Diagram.
  it('Online User : Allow a logged in user to view a list of competitions if he/she is a store member.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    // Save store joined member to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore()
      .collection('stores').doc(store.storeId)
      .collection('store_joined_members').doc(myUserData.userId)
      .set(myUserData);
    });

    const docs = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions');

    await assertSucceeds(docs.get());
        
  });

  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #7a On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to view a list of competitions.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const docs = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions');

    await assertFails(docs.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #7a On A Use Case Diagram.
  it('Admin : Do not allow admins to view a list of competitions.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const docs = adminUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions');

    await assertFails(docs.get());
        
  }); // Working As Expected.
  

  


  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #6a, #6b On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to delete a competition.', async()=>{

    const store = {
      storeId: 'store_xyz',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).set(store);
    });


    const competition = {
      competitionId: 'competition_xyz',
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const doc = noUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId);
    
    await assertFails(doc.delete());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #6a, #6b On A Use Case Diagram.
  it('Online User : Do not allow logged in users to delete a competition.', async()=>{

    const store = {
      storeId: 'store_xyz',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).set(store);
    });


    const competition = {
      competitionId: 'competition_xyz',
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId);
    
    await assertFails(doc.delete());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #6a, #6b On A Use Case Diagram.
  it('Store Owner : Allow store owners to delete a competition.', async()=>{

    const store = {
      storeId: 'store_xyz',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).set(store);
    });


    const competition = {
      competitionId: 'competition_xyz',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId);
    
    await assertSucceeds(doc.delete());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/{competitionId}
  // Use Case #6a, #6b On A Use Case Diagram.
  it('Admin : Do not allow admins to  delete a competition.', async()=>{

    const store = {
      storeId: 'store_xyz',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).set(store);
    });


    const competition = {
      competitionId: 'competition_xyz',
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const doc = adminUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId);

    await assertFails(doc.delete());
        
  }); // Working As Expected.
  



   
  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.1a On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to create grand prices grids for a competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    const doc = noUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId).collection('grand_prices_grid')
    .doc(grandPricesGrid.competitionPricesGridId);
    await assertFails(doc.set(grandPricesGrid));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.1a On A Use Case Diagram.
  it('Online User : Do not allow logged in users to create grand prices grids for a competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId).collection('grand_prices_grid')
    .doc(grandPricesGrid.competitionPricesGridId);
    await assertFails(doc.set(grandPricesGrid));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.1a On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to create grand price grids for a '
  + 'competition that do not exist or they did not create.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: someId,
    };

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId).collection('grand_prices_grid')
    .doc(grandPricesGrid.competitionPricesGridId);
    await assertFails(doc.set(grandPricesGrid));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.1a On A Use Case Diagram.
  it('Store Owner : Allow store owners to create grand price grids for a competition they created.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId).collection('grand_prices_grid')
    .doc(grandPricesGrid.competitionPricesGridId);
    await assertSucceeds(doc.set(grandPricesGrid));
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.1a On A Use Case Diagram.
  it('Admin : Do not allow admins to create grand prices grids for a competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    const doc = adminUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId).collection('grand_prices_grid')
    .doc(grandPricesGrid.competitionPricesGridId);
    await assertFails(doc.set(grandPricesGrid));
        
  }); // Working As Expected.
  
  
  
  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.2a On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to update grand_price grids for competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a competitor grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).collection('grand_prices_grid')
      .doc(grandPricesGrid.competitionPricesGridId).set(grandPricesGrid);
    });

    const doc = noUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId).collection('grand_prices_grid')
    .doc(grandPricesGrid.competitionPricesGridId);
    await assertFails(doc.update({competitionFK: 'new data'}));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.2a On A Use Case Diagram.
  it('Online User : Do not allow logged in users to update grand price grids for competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a grand price grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).collection('grand_prices_grid')
      .doc(grandPricesGrid.competitionPricesGridId)
      .set(grandPricesGrid);
    });

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId).collection('grand_prices_grid')
    .doc(grandPricesGrid.competitionPricesGridId);
    await assertFails(doc.update({competitionFK: 'new data'}));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.2a On A Use Case Diagram.
  it('Store Owner : Allow store owners to update grand_price grids for competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a grand price grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).collection('grand_prices_grid')
      .doc(grandPricesGrid.competitionPricesGridId).set(grandPricesGrid);
    });

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId).collection('grand_prices_grid')
    .doc(grandPricesGrid.competitionPricesGridId);
    await assertSucceeds(doc.update({competitionFK: 'new data'}));
        
  }); 
  
  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.2a On A Use Case Diagram.
  it('Admin : Do not allow admins to update grand_price grids for competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a competitor grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId)
      .collection('grand_prices_grid')
      .doc(grandPricesGrid.competitionPricesGridId)
      .set(grandPricesGrid);
    });

    const doc = adminUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId).collection('grand_prices_grid')
    .doc(grandPricesGrid.competitionPricesGridId);
    await assertFails(doc.update({competitionFK: 'new data'}));
        
  }); // Working As Expected.
  
  

  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.3a On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to delete grand_price grids for competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a grand price grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).collection('grand_prices_grid')
      .doc(grandPricesGrid.competitionPricesGridId).set(grandPricesGrid);
    });

    const doc = noUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId).collection('grand_prices_grid')
    .doc(grandPricesGrid.competitionPricesGridId);
    await assertFails(doc.delete());
        
  });

  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.3a On A Use Case Diagram.
  it('Online User : Do not allow logged in users to delete grand_price grids for competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a grand price grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).collection('grand_prices_grid')
      .doc(grandPricesGrid.competitionPricesGridId).set(grandPricesGrid);
    });

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId).collection('grand_prices_grid')
    .doc(grandPricesGrid.competitionPricesGridId);
    await assertFails(doc.delete());
        
  });

  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.3a On A Use Case Diagram.
  it('Store Owner : Do not llow store owners to delete grand_price grids for a competitions they did not create.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: theirUserData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a grand price grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).collection('grand_prices_grid')
      .doc(grandPricesGrid.competitionPricesGridId).set(grandPricesGrid);
    });

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId).collection('grand_prices_grid')
    .doc(grandPricesGrid.competitionPricesGridId);
    await assertFails(doc.delete());
        
  });

  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.3a On A Use Case Diagram.
  it('Store Owner : Allow store owners to delete grand_price grids for a competitions they created.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a grand price grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).collection('grand_prices_grid')
      .doc(grandPricesGrid.competitionPricesGridId).set(grandPricesGrid);
    });

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId).collection('grand_prices_grid')
    .doc(grandPricesGrid.competitionPricesGridId);
    await assertSucceeds(doc.delete());
        
  });

  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.3a On A Use Case Diagram.
  it('Admin : Do not allow admins to delete grand_price grids for competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a grand price grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId).collection('grand_prices_grid')
      .doc(grandPricesGrid.competitionPricesGridId).set(grandPricesGrid);
    });

    const doc = adminUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId).collection('grand_prices_grid')
    .doc(grandPricesGrid.competitionPricesGridId);
    await assertFails(doc.delete());
        
  });
  

  
  // Testing /stores/storeId/store_competitions/competitionId/grand_prices_grid/grandPriceGridId
  // Use Case #4.4a On A Use Case Diagram.
  it('Offline User : Allow not logged in users to view a grand price grid for a competition.', async()=>{

    const doc = noUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions').doc(someId)
    .collection('grand_prices_grid').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitionId/grand_prices_grid/grandPriceGridId
  // Use Case #4.4a On A Use Case Diagram.
  it('Online User : Allow logged in users to view a grand price grid for a competition.', async()=>{

    const doc = myUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions').doc(someId)
    .collection('grand_prices_grid').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitionId/grand_prices_grid/grandPriceGridId
  // Use Case #4.4a On A Use Case Diagram.
  it('Store Owner : Allow store owners to view a grand_prices grid for a competition.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions').doc(someId)
    .collection('grand_prices_grid').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitionId/grand_prices_grid/grandPriceGridId
  // Use Case #4.4a On A Use Case Diagram.
  it('Admin : Allow admins to view a grand prices grid for a competition.', async()=>{

    const doc = adminUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions').doc(someId)
    .collection('grand_prices_grid').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.
  
  
  
  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.4a On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to view a list of grand prices grid for a competitions.', async()=>{

    const docs = noUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions').doc(someId)
    .collection('grand_prices_grid');
    await assertFails(docs.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.4a On A Use Case Diagram.
  it('Online User : Do not allow logged in users to view a list of grand prices grid for a competitions.', async()=>{

    const docs = myUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions').doc(someId)
    .collection('grand_prices_grid');
    await assertFails(docs.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.4a On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to view a list of grand prices grid for a competitions.', async()=>{

    const docs = storeOwnerUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions').doc(someId)
    .collection('grand_prices_grid');
    await assertFails(docs.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId
  // Use Case #4.4a On A Use Case Diagram.
  it('Admin : Do not allow admins to view a list of grand price grid for a competitions.', async()=>{

    const docs = adminUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions').doc(someId)
    .collection('grand_prices_grid');
    await assertFails(docs.get());
        
  }); // Working As Expected.
  
 
  
  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId/grand_prices_tokens/tokenId
  // Use Case #4.1a On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to create grand price tokens for a grand price grid of some competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(someId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a grand price grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(someId).collection('store_competitions')
      .doc(competition.competitionId).collection('grand_prices_grid')
      .doc(grandPricesGrid.competitionPricesGridId)
      .set(grandPricesGrid);
    });

    const grandPriceToken = {
      grandPriceTokenId: someId,
      competitionGrandPricesGridFK: grandPricesGrid.competitionPricesGridId,
    };

    const doc = noUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(competition.competitionId).collection('grand_prices_grid')
    .doc(grandPricesGrid.competitionPricesGridId).collection('grand_price_tokens')
    .doc(grandPriceToken.grandPriceTokenId);
    await assertFails(doc.set(grandPriceToken));
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId/grand_price_tokens/tokenId
  // Use Case #4.1a On A Use Case Diagram.
  it('Online User : Do not allow logged in users to create grand price tokens for a grand price grid of some competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(someId).collection('store_competitions')
      .doc(competition.competitionId).set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a grand price grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(someId).collection('store_competitions')
      .doc(competition.competitionId).collection('grand_prices_grid')
      .doc(grandPricesGrid.competitionPricesGridId).set(grandPricesGrid);
    });

    const grandPriceToken = {
      grandPriceTokenId: someId,
      competitionGrandPricesGridFK: grandPricesGrid.competitionPricesGridId,
    };

    const doc = myUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(competition.competitionId)
    .collection('grand_prices_grid').doc(grandPricesGrid.competitionPricesGridId)
    .collection('grand_price_tokens').doc(grandPriceToken.grandPriceTokenId);
    await assertFails(doc.set(grandPriceToken));
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId/grand_price_tokens/tokenId
  // Use Case #4.1a On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to create grand price tokens for ' +
  'a grand price grid that do not exist or the one belonging to a store not owned ' +
  'by the current store owner.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(someId).collection('store_competitions')
      .doc(competition.competitionId)
      .set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a grand price grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(someId).collection('store_competitions')
      .doc(competition.competitionId)
      .collection('grand_prices_grid').doc(grandPricesGrid.competitionPricesGridId)
      .set(grandPricesGrid);
    });

    const grandPriceToken = {
      grandPriceTokenId: 'grand_price_token_abc',
      competitionGrandPricesGridFK: someId,
    };

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(competition.competitionId)
    .collection('grand_prices_grid').doc(grandPricesGrid.competitionPricesGridId)
    .collection('grand_price_tokens').doc(grandPriceToken.grandPriceTokenId);
    await assertFails(doc.set(grandPriceToken));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId/grand_price_tokens/tokenId
  // Use Case #4.1a On A Use Case Diagram.
  it('Store Owner : Allow store owners to create grand price tokens for a grand price grid that exist.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId)
      .set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a grand price grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId)
      .collection('grand_prices_grid').doc(grandPricesGrid.competitionPricesGridId)
      .set(grandPricesGrid);
    });

    const grandPriceToken = {
      grandPriceTokenId: 'grand_price_token',
      competitionGrandPricesGridFK: grandPricesGrid.competitionPricesGridId,
    };

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId)
    .collection('grand_prices_grid').doc(grandPricesGrid.competitionPricesGridId)
    .collection('grand_price_tokens').doc(grandPriceToken.grandPriceTokenId);
    await assertSucceeds(doc.set(grandPriceToken));
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId/grand_prices_tokens/tokenId
  // Use Case #4.1a On A Use Case Diagram.
  it('Admin : Do not allow admins to create grand price tokens for a grand price grid of some competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(someId).collection('store_competitions')
      .doc(competition.competitionId)
      .set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a grand price grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(someId).collection('store_competitions')
      .doc(competition.competitionId)
      .collection('grand_prices_grid').doc(grandPricesGrid.competitionPricesGridId)
      .set(grandPricesGrid);
    });

    const grandPriceToken = {
      grandPriceTokenId: someId,
      competitionGrandPricesGridFK: grandPricesGrid.competitionPricesGridId,
    };

    const doc = adminUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(competition.competitionId)
    .collection('grand_prices_grid').doc(grandPricesGrid.competitionPricesGridId)
    .collection('grand_price_tokens').doc(grandPriceToken.grandPriceTokenId);
    await assertFails(doc.set(grandPriceToken));
        
  }); // Working As Expected.
  
  
  
  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId/grand_price_tokens/grandPriceTokenId
  // Use Case #4.2a On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to update grand price tokens for a grand price grid.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId)
      .set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a grand price grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId)
      .collection('grand_prices_grid').doc(grandPricesGrid.competitionPricesGridId)
      .set(grandPricesGrid);
    });

    const grandPriceToken = {
      grandPriceTokenId: 'token_abc',
      isPointed: true,
      competitionGrandPricesGridFK: grandPricesGrid.competitionPricesGridId,
    };

    // Save a grand price token to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId)
      .collection('grand_prices_grid').doc(grandPricesGrid.competitionPricesGridId)
      .collection('grand_price_tokens').doc(grandPriceToken.grandPriceTokenId)
      .set(grandPricesGrid);
    });

    const doc = noUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId)
    .collection('grand_prices_grid').doc(grandPriceToken.competitionGrandPricesGridFK)
    .collection('grand_price_tokens').doc(grandPriceToken.grandPriceTokenId);
    await assertFails(doc.update({isPointed:false}));
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId/grand_price_tokens/grandPriceTokenId
  // Use Case #4.2a On A Use Case Diagram.
  it('Online User : Do not allow logged in users to update grand_price tokens for a grand price grid.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId)
      .set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a grand price grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId)
      .collection('grand_prices_grid').doc(grandPricesGrid.competitionPricesGridId)
      .set(grandPricesGrid);
    });

    const grandPriceToken = {
      grandPriceTokenId: 'token_abc',
      isPointed: true,
      competitionGrandPricesGridFK: grandPricesGrid.competitionPricesGridId,
    };

    // Save a grand price token to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId)
      .collection('grand_prices_grid').doc(grandPricesGrid.competitionPricesGridId)
      .collection('grand_price_tokens').doc(grandPriceToken.grandPriceTokenId)
      .set(grandPricesGrid);
    });

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId)
    .collection('grand_prices_grid').doc(grandPriceToken.competitionGrandPricesGridFK)
    .collection('grand_price_tokens').doc(grandPriceToken.grandPriceTokenId);
    await assertFails(doc.update({isPointed:false}));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId/grand_price_tokens/grandPriceTokenId
  // Use Case #4.2a On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to update grand_price tokens for a grand price grid.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId)
      .set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a grand price grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId)
      .collection('grand_prices_grid').doc(grandPricesGrid.competitionPricesGridId)
      .set(grandPricesGrid);
    });

    const grandPriceToken = {
      grandPriceTokenId: 'token_abc',
      isPointed: true,
      competitionGrandPricesGridFK: grandPricesGrid.competitionPricesGridId,
    };

    // Save a grand price token to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId)
      .collection('grand_prices_grid').doc(grandPricesGrid.competitionPricesGridId)
      .collection('grand_price_tokens').doc(grandPriceToken.grandPriceTokenId)
      .set(grandPricesGrid);
    });

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId)
    .collection('grand_prices_grid').doc(grandPriceToken.competitionGrandPricesGridFK)
    .collection('grand_price_tokens').doc(grandPriceToken.grandPriceTokenId);
    await assertFails(doc.update({isPointed:false}));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId/grand_price_tokens/grandPriceTokenId
  // Use Case #4.2a On A Use Case Diagram.
  it('Admin : Do not allow admins to update grand price tokens for a grand price grid.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId)
      .set(competition);
    });

    const grandPricesGrid = {
      competitionPricesGridId: 'grand_prices_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a grand price grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId)
      .collection('grand_prices_grid').doc(grandPricesGrid.competitionPricesGridId)
      .set(grandPricesGrid);
    });

    const grandPriceToken = {
      grandPriceTokenId: 'token_abc',
      isPointed: true,
      competitionGrandPricesGridFK: grandPricesGrid.competitionPricesGridId,
    };

    // Save a grand price token to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competition.competitionId)
      .collection('grand_prices_grid').doc(grandPricesGrid.competitionPricesGridId)
      .collection('grand_price_tokens').doc(grandPriceToken.grandPriceTokenId)
      .set(grandPricesGrid);
    });

    const doc = adminUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions')
    .doc(competition.competitionId)
    .collection('grand_prices_grid').doc(grandPriceToken.competitionGrandPricesGridFK)
    .collection('grand_price_tokens').doc(grandPriceToken.grandPriceTokenId);
    await assertFails(doc.update({isPointed:false}));
        
  }); // Working As Expected.
  

  
  // Testing /stores/storeId/store_competitions/competitionId/grand_prices_grid/grandPriceGridId/grand_price_tokens/grandPriceTokenId
  // Use Case #4.4a On A Use Case Diagram.
  it('Offline User : Allow not logged in users to view a grand price tokens for a given grand price grid.', async()=>{

    const doc = noUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('grand_prices_grid').doc(someId)
    .collection('grand_price_tokens').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitionId/grand_prices_grid/grandPriceGridId/grand_price_tokens/grandPriceTokenId
  // Use Case #4.4a On A Use Case Diagram.
  it('Online User : Allow logged in users to view a grand price token for a given grand price grid.', async()=>{

    const doc = myUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('grand_prices_grid').doc(someId)
    .collection('grand_price_tokens').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitionId/grand_prices_grid/grandPriceGridId/grand_price_tokens/grandPriceTokenId
  // Use Case #4.4a On A Use Case Diagram.
  it('Store Owner : Allow store owners to view a grand price token for a given grand price grid.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('grand_prices_grid').doc(someId)
    .collection('grand_price_tokens').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitionId/grand_prices_grid/grandPriceGridId/grand_price_tokens/grand_priceTokenId
  // Use Case #4.4a On A Use Case Diagram.
  it('Admin : Allow admins to view a grand price token for a given grand price grid.', async()=>{

    const doc = adminUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('grand_prices_grid').doc(someId)
    .collection('grand_price_tokens').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.
  

  
  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grand_priceGridId/grand_price_tokens/tokenId
  // Use Case #4.4a On A Use Case Diagram.
  it('Offline User : Allow not logged in users to query grand price tokens of a particular competition.', async()=>{

    const documents = noUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('grand_prices_grid').doc(someId)
    .collection('grand_price_tokens');
    await assertSucceeds(documents.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId/grand_price_tokens/tokenId
  // Use Case #4.4a On A Use Case Diagram.
  it('Online User : Allow logged in users to query grand price tokens of a particular competition.', async()=>{

    const documents = myUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('grand_prices_grid').doc(someId)
    .collection('grand_price_tokens');
    await assertSucceeds(documents.get());
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId/grand_price_tokens/tokenId
  // Use Case #4.4a On A Use Case Diagram.
  it('Store Owner : Allow store owners to query grand price tokens of a particular competition.', async()=>{

    const documents = storeOwnerUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('grand_prices_grid').doc(someId)
    .collection('grand_price_tokens');
    await assertSucceeds(documents.get());
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/grand_prices_grid/grandPriceGridId/grand_prices_tokens/tokenId
  // Use Case #4.4a On A Use Case Diagram.
  it('Admin : Allow admins to query grand price tokens of a particular competition.', async()=>{

    const documents = adminUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('grand_prices_grid').doc(someId)
    .collection('grand_price_tokens');
    await assertSucceeds(documents.get());
        
  }); // Working As Expected.
  
  
  
  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId
  // Use Case #4.1b On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to create competitors grids for a competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: myUserData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(someId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitionCompetitorsGridId: 'competitor_grid_abc',
      competitionFK: competition.competitionId,
    };

    const doc = noUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competitors_grid').doc(competitorGrid.competitionCompetitorsGridId);
    await assertFails(doc.set(competitorGrid));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId
  // Use Case #4.1b On A Use Case Diagram.
  it('Online User : Do not allow logged in users to create competitors grids for a competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: myUserData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitionCompetitorsGridId: 'competitor_grid_abc',
      competitionFK: competition.competitionId,
    };

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competitors_grid').doc(competitorGrid.competitionCompetitorsGridId);
    await assertFails(doc.set(competitorGrid));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId
  // Use Case #4.1b On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to create competitor grids for a competition that do not exist.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitionCompetitorsGridId: 'competitor_grid_abc',
      competitionFK: someId,
    };

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competitors_grid').doc(competitorGrid.competitionCompetitorsGridId);
    await assertFails(doc.set(competitorGrid));
        
  }); // Working As Expected.
 
  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId
  // Use Case #4.1b On A Use Case Diagram.
  it('Store Owner : Allow store owners to create competitor grids for a competition they created.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitionCompetitorsGridId: 'competitor_grid_abc',
      competitionFK: competition.competitionId,
    };

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competitors_grid').doc(competitorGrid.competitionCompetitorsGridId);
    await assertSucceeds(doc.set(competitorGrid));
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId
  // Use Case #4.1b On A Use Case Diagram.
  it('Admin : Do not allow admins to create competitors grids for a competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: adminData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitionCompetitorsGridId: 'competitor_grid_abc',
      competitionFK: competition.competitionId,
    };

    const doc = adminUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competitors_grid').doc(competitorGrid.competitionCompetitorsGridId);
    await assertFails(doc.set(competitorGrid));
        
  }); // Working As Expected.
  

  
  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId
  // Use Case #4.4b On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to update competitor grids for a competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitorGridId: someId,
      competitionFK: competition.competitionId,
      users: [
        {
          userName: 'user_1',
          imageUrl:'../../image1.jpg',
        },
        {
          userName: 'user_2',
          imageUrl:'../../image2.jpg',
        }
      ],
    };

    // Save a competitor grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(someId)
      .collection('competitors_grid').doc(competitorGrid.competitorGridId)
      .set(competitorGrid);
    });

    const doc = noUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(someId)
    .collection('competitors_grid').doc(competitorGrid.competitorGridId);
    await assertFails(doc.update({competitorGridId: 'new data'}));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId
  // Use Case #4.4b On A Use Case Diagram.
  it('Online User : Do not allow logged in users to update competitor grids for a competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitorGridId: someId,
      competitionFK: competition.competitionId,
      users: [
        {
          userName: 'user_1',
          imageUrl:'../../image1.jpg',
        },
        {
          userName: 'user_2',
          imageUrl:'../../image2.jpg',
        }
      ],
    };

    // Save a competitor grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(someId)
      .collection('competitors_grid').doc(competitorGrid.competitorGridId)
      .set(competitorGrid);
    });

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(someId)
    .collection('competitors_grid').doc(competitorGrid.competitorGridId);
    await assertFails(doc.update({competitorGridId: 'new data'}));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId
  // Use Case #4.4b On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to update competitor grids for a competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitorGridId: someId,
      competitionFK: competition.competitionId,
      users: [
        {
          userName: 'user_1',
          imageUrl:'../../image1.jpg',
        },
        {
          userName: 'user_2',
          imageUrl:'../../image2.jpg',
        }
      ],
    };

    // Save a competitor grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(someId)
      .collection('competitors_grid').doc(competitorGrid.competitorGridId)
      .set(competitorGrid);
    });

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(someId)
    .collection('competitors_grid').doc(competitorGrid.competitorGridId);
    await assertFails(doc.update({competitorGridId: 'new data'}));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId
  // Use Case #4.4b On A Use Case Diagram.
  it('Admin : Do not allow admins to update competitor grids for a competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitorGridId: someId,
      competitionFK: competition.competitionId,
      users: [
        {
          userName: 'user_1',
          imageUrl:'../../image1.jpg',
        },
        {
          userName: 'user_2',
          imageUrl:'../../image2.jpg',
        }
      ],
    };


    // Save a competitor grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(someId)
      .collection('competitors_grid').doc(competitorGrid.competitorGridId)
      .set(competitorGrid);
    });

    const doc = adminUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(someId)
    .collection('competitors_grid').doc(competitorGrid.competitorGridId);
    await assertFails(doc.update({competitorGridId: 'new data'}));
        
  }); // Working As Expected.
  

  
  
  // Testing /stores/storeId/store_competitions/competitionId/competitors_grid/competitorGridId
  // Use Case #4.3b On A Use Case Diagram.
  it('Offline User : Allow not logged in users to view a competitor grid for a competition.', async()=>{

    const doc = noUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('competitors_grid').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitionId/competitors_grid/competitorGridId
  // Use Case #4.3b On A Use Case Diagram.
  it('Online User : Allow logged in users to view a competitor grid for a competition.', async()=>{

    const doc = myUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('competitors_grid').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitionId/competitors_grid/competitorGridId
  // Use Case #4.3b On A Use Case Diagram.
  it('Store Owner : Allow store owners to view a competitor grid for a competition.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('competitors_grid').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitionId/competitors_grid/competitorGridId
  // Use Case #4.3b On A Use Case Diagram.
  it('Admin : Allow admins to view a competitor grid for a competition.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('competitors_grid').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.
  

  
  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId
  // Use Case #4.3b On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to view a list of competitors grid for a competitions.', async()=>{

    const doc = noUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('competitors_grid');
    await assertFails(doc.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId
  // Use Case #4.3b On A Use Case Diagram.
  it('Online User : Do not allow logged in users to view a list of competitors grid for a competitions.', async()=>{

    const doc = myUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('competitors_grid');
    await assertFails(doc.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId
  // Use Case #4.3b On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to view a list of competitors grid for a competitions.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('competitors_grid');
    await assertFails(doc.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId
  // Use Case #4.3b On A Use Case Diagram.
  it('Admin : Do not allow admins to view a list of competitors grid for a competitions.', async()=>{

    const doc = adminUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('competitors_grid');
    await assertFails(doc.get());
        
  }); // Working As Expected.
  
  
  
  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId/competitors_tokens/tokenId
  // Use Case #4.1b On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to create competitor tokens for a competitor grid of some competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: myUserData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitionCompetitorsGridId: 'competitor_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a competitor grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competitorGrid.competitionFK)
      .collection('competitors_grid').doc(competitorGrid.competitionCompetitorsGridId)
      .set(competitorGrid);
    });

    const competitorToken = {
      competitionCompetitorTokenId: someId,
      competitionCompetitorsGridFK: competitorGrid.competitionCompetitorsGridId,
    };

    const doc = noUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competitors_grid').doc(competitorGrid.competitionCompetitorsGridId)
    .collection('competitors_tokens').doc(competitorToken.competitionCompetitorTokenId);
    await assertFails(doc.set(competitorToken));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId/competitors_tokens/tokenId
  // Use Case #4.1b On A Use Case Diagram.
  it('Online User : Do not allow logged in users to create competitor tokens for a competitor grid of some competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: myUserData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitionCompetitorsGridId: 'competitor_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a competitor grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competitorGrid.competitionCompetitorsGridId)
      .set(competition);
    });

    const competitorToken = {
      competitionCompetitorTokenId: someId,
      competitionCompetitorsGridFK: competitorGrid.competitionCompetitorsGridId,
    };

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competitors_grid').doc(competitorGrid.competitionCompetitorsGridId)
    .collection('competitors_tokens').doc(competitorToken.competitionCompetitorTokenId);
    await assertFails(doc.set(competitorToken));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId/competitors_tokens/tokenId
  // Use Case #4.1b On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to create competitor tokens for a competitor grid that do not exist.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitionCompetitorsGridId: 'competitor_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a competitor grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions')
      .doc(competitorGrid.competitionCompetitorsGridId)
      .set(competition);
    });

    const competitorToken = {
      competitionCompetitorTokenId: 'token_abc',
      competitionCompetitorsGridFK: someId,
    };

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competitors_grid').doc(competitorGrid.competitionCompetitorsGridId)
    .collection('competitors_tokens').doc(competitorToken.competitionCompetitorTokenId);
    await assertFails(doc.set(competitorToken));
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId/competitors_tokens/tokenId
  // Use Case #4.1b On A Use Case Diagram.
  it('Store Owner : Allow store owners to create competitor tokens for a competitor grid that exist.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitionCompetitorsGridId: 'competitor_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a competitor grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competitorGrid.competitionCompetitorsGridId)
      .set(competition);
    });

    const competitorToken = {
      competitionCompetitorTokenId: someId,
      competitionCompetitorsGridFK: competitorGrid.competitionCompetitorsGridId,
    };

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competitors_grid').doc(competitorGrid.competitionCompetitorsGridId)
    .collection('competitors_tokens').doc(competitorToken.competitionCompetitorTokenId);
    await assertSucceeds(doc.set(competitorToken));
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId/competitors_tokens/tokenId
  // Use Case #4.1b On A Use Case Diagram.
  it('Admin : Do not allow admins to create competitor tokens for a competitor grid of some competitions.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: adminData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitionCompetitorsGridId: 'competitor_grid_abc',
      competitionFK: competition.competitionId,
    };

    // Save a competitor grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competitorGrid.competitionCompetitorsGridId)
      .set(competition);
    });

    const competitorToken = {
      competitionCompetitorTokenId: someId,
      competitionCompetitorsGridFK: competitorGrid.competitionCompetitorsGridId,
    };

    const doc = adminUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competitors_grid').doc(competitorGrid.competitionCompetitorsGridId)
    .collection('competitors_tokens').doc(competitorToken.competitionCompetitorTokenId);
    await assertFails(doc.set(competitorToken));
        
  }); // Working As Expected.
  
  
  // clear & npm test
  
  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId
  // Use Case #4.4b On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to update competitor tokens for a competitor grid.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitorGridId: someId,
      competitionFK: competition.competitionId,
      users: [
        {
          userName: 'user_1',
          imageUrl:'../../image1.jpg',
        },
        {
          userName: 'user_2',
          imageUrl:'../../image2.jpg',
        }
      ],
    };

    // Save a competitor grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .collection('competitors_grid').doc(competitorGrid.competitorGridId)
      .set(competitorGrid);
    });

    const competitorToken = {
      competitionCompetitorTokenId: someId,
      isPointed:true,
      competitionCompetitorsGridFK: competitorGrid.competitionCompetitorsGridId,
    };

    const doc = noUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competitors_grid').doc(competitorGrid.competitionCompetitorsGridId)
    .collection('competitors_tokens').doc(competitorToken.competitionCompetitorTokenId);
    await assertFails(doc.update({isPointed: false}));
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId
  // Use Case #4.4b On A Use Case Diagram.
  it('Online User : Do not allow logged in users to update competitor tokens for a competitor grid.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitorGridId: someId,
      competitionFK: competition.competitionId,
      users: [
        {
          userName: 'user_1',
          imageUrl:'../../image1.jpg',
        },
        {
          userName: 'user_2',
          imageUrl:'../../image2.jpg',
        }
      ],
    };

    // Save a competitor grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(someId)
      .collection('competitors_grid').doc(competitorGrid.competitorGridId)
      .set(competitorGrid);
    });

    const competitorToken = {
      competitionCompetitorTokenId: someId,
      isPointed:true,
      competitionCompetitorsGridFK: competitorGrid.competitionCompetitorsGridId,
    };

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competitors_grid').doc(competitorGrid.competitionCompetitorsGridId)
    .collection('competitors_tokens').doc(competitorToken.competitionCompetitorTokenId);
    await assertFails(doc.update({isPointed: false}));
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId
  // Use Case #4.4b On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to update competitor tokens for a competitor grid.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitorGridId: someId,
      competitionFK: competition.competitionId,
      users: [
        {
          userName: 'user_1',
          imageUrl:'../../image1.jpg',
        },
        {
          userName: 'user_2',
          imageUrl:'../../image2.jpg',
        }
      ],
    };

    // Save a competitor grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(someId)
      .collection('competitors_grid').doc(competitorGrid.competitorGridId)
      .set(competitorGrid);
    });

    const competitorToken = {
      competitionCompetitorTokenId: someId,
      isPointed:true,
      competitionCompetitorsGridFK: competitorGrid.competitionCompetitorsGridId,
    };

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competitors_grid').doc(competitorGrid.competitionCompetitorsGridId)
    .collection('competitors_tokens').doc(competitorToken.competitionCompetitorTokenId);
    await assertFails(doc.update({isPointed: false}));
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId
  // Use Case #4.4b On A Use Case Diagram.
  it('Admin : Do not allow admins to update competitor tokens for a competitor grid.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const competitorGrid = {
      competitorGridId: someId,
      competitionFK: competition.competitionId,
      users: [
        {
          userName: 'user_1',
          imageUrl:'../../image1.jpg',
        },
        {
          userName: 'user_2',
          imageUrl:'../../image2.jpg',
        }
      ],
    };

    // Save a competitor grid to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(someId)
      .collection('competitors_grid').doc(competitorGrid.competitorGridId)
      .set(competitorGrid);
    });

    const competitorToken = {
      competitionCompetitorTokenId: someId,
      isPointed:true,
      competitionCompetitorsGridFK: competitorGrid.competitionCompetitorsGridId,
    };

    const doc = adminUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competitors_grid').doc(competitorGrid.competitionCompetitorsGridId)
    .collection('competitors_tokens').doc(competitorToken.competitionCompetitorTokenId);
    await assertFails(doc.update({isPointed: false}));
        
  }); // Working As Expected.
  

  

  // Testing /stores/storeId/store_competitions/competitionId/competitors_grid/competitorGridId/competitors_tokens/competitorTokenId
  // Use Case #4.3b On A Use Case Diagram.
  it('Offline User : Allow not logged in users to view a competitor tokens for a given competitor grid.', async()=>{

    const doc = noUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('competitors_grid').doc(someId)
    .collection('competitors_tokens').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitionId/competitors_grid/competitorGridId/competitors_tokens/competitorTokenId
  // Use Case #4.3b On A Use Case Diagram.
  it('Online User : Allow logged in users to view a competition token for a given competitor grid.', async()=>{

    const doc = myUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('competitors_grid').doc(someId)
    .collection('competitors_tokens').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitionId/competitors_grid/competitorGridId/competitors_tokens/competitorTokenId
  // Use Case #4.3b On A Use Case Diagram.
  it('Store Owner : Allow store owners to view a competition token for a given competitor grid.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('competitors_grid').doc(someId)
    .collection('competitors_tokens').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitionId/competitors_grid/competitorGridId/competitors_tokens/competitorTokenId
  // Use Case #4.3b On A Use Case Diagram.
  it('Admin : Allow admins to view a competition token for a given competitor grid.', async()=>{

    const doc = adminUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('competitors_grid').doc(someId)
    .collection('competitors_tokens').doc(someId);
    await assertSucceeds(doc.get());
        
  }); // Working As Expected.
  

  
  
  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId/competitor_tokens/tokenId
  // Use Case #4.3b On A Use Case Diagram.
  it('Offline User : Allow not logged in users to query competitor tokens of a particular competition.', async()=>{

    const documents = noUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('competitors_grid').doc(someId)
    .collection('competitors_tokens');
    await assertSucceeds(documents.get());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId/competitor_tokens/tokenId
  // Use Case #4.3b On A Use Case Diagram.
  it('Online User : Allow logged in users to query competitor tokens of a particular competition.', async()=>{

    const documents = myUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('competitors_grid').doc(someId)
    .collection('competitors_tokens');
    await assertSucceeds(documents.get());
        
  });

  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId/competitor_tokens/tokenId
  // Use Case #4.3b On A Use Case Diagram.
  it('Store Owner : Allow store owners to query competitor tokens of a particular competition.', async()=>{

    const documents = storeOwnerUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('competitors_grid').doc(someId)
    .collection('competitors_tokens');
    await assertSucceeds(documents.get());
        
  });

  // Testing /stores/storeId/store_competitions/competitonId/competitors_grid/competitorGridId/competitor_tokens/tokenId
  // Use Case #4.3b On A Use Case Diagram.
  it('Admin : Allow admins to query competitor tokens of a particular competition.', async()=>{

    const documents = adminUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions')
    .doc(someId).collection('competitors_grid').doc(someId)
    .collection('competitors_tokens');
    await assertSucceeds(documents.get());
        
  });
  


  
  
  // Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
  // Use Case #4.1b On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to recruit new members on a competition.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const doc = noUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competition_joined_members').doc(someId);
    await assertFails(doc.set({data:'new competitor joined member'}));
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
  // Use Case #4.1b On A Use Case Diagram.
  it('Online User : Do not allow logged in users to recruit new members on a competition.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competition_joined_members').doc(someId);
    await assertFails(doc.set({data:'new competitor joined member'}));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
  // Use Case #4.1b On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to recruit new members on a competition not belonging to their store.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const doc = otherStoreOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competition_joined_members').doc(someId);
    await assertFails(doc.set({data:'new competitor joined member'}));
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
  // Use Case #4.1b On A Use Case Diagram.
  it('Store Owner : Allow store owners to recruit new members on a competition.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competition_joined_members').doc(someId);
    await assertSucceeds(doc.set({data:'new competitor joined member'}));
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
  // Use Case #4.1b On A Use Case Diagram.
  it('Admin : Do not allow admins to recruit members to a competition.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const doc = adminUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competition_joined_members').doc(someId);
    await assertFails(doc.set({data:'new competitor joined member'}));
        
  }); // Working As Expected.
  
  
  
  // Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
  // Use Case #4.2b On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to remove competition joined members.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const doc = noUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competition_joined_members').doc(someId);
    await assertFails(doc.delete());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
  // Use Case #4.2b On A Use Case Diagram.
  it('Online User : Do not allow logged in users to remove competition joined members.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competition_joined_members').doc(someId);
    await assertFails(doc.delete());
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
  // Use Case #4.2b On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to remove joined members on a competition not belonging to their store.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const doc = otherStoreOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competition_joined_members').doc(someId);
    await assertFails(doc.delete());
        
  }); // Working As Expected.
  
  // Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
  // Use Case #4.2b On A Use Case Diagram.
  it('Store Owner : Allow store owners to remove new members on a competition.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    // Save competitor to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .collection('competition_joined_members').doc(theirUserData.userId)
      .set(theirUserData);
    });

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competition_joined_members').doc(theirUserData.userId);
    await assertSucceeds(doc.delete());
        
  }); // Working As Expected.

  // Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
  // Use Case #4.2b On A Use Case Diagram.
  it('Admin : Do not allow admins to remove competition joined members.', async()=>{

    const store = {
      storeId: 'store_pmb',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const competition = {
      competitionId: 'comp_abc',
      storeFK: store.storeId,
    };

    // Save competition to refer to.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
      .set(competition);
    });

    const doc = adminUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_competitions').doc(competition.competitionId)
    .collection('competition_joined_members').doc(someId);
    await assertFails(doc.delete());
        
  }); // Working As Expected.
  

  
  
  
 // Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
 // Use Case #4.3b On A Use Case Diagram.
 it('Offline User : Allow not logged in users to view a joined member of a given competition.', async()=>{

  const doc = noUser.firestore().collection('stores')
  .doc(someId).collection('store_competitions').doc(someId)
  .collection('competition_joined_members').doc(someId);
  await assertSucceeds(doc.get());
      
}); // Working As Expected.

// Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
// Use Case #4.3b On A Use Case Diagram.
it('Online User : Allow logged in users to view a joined member of a given competition.', async()=>{

  const doc = myUser.firestore().collection('stores')
  .doc(someId).collection('store_competitions').doc(someId)
  .collection('competition_joined_members').doc(someId);
  await assertSucceeds(doc.get());
      
}); // Working As Expected.

// Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
// Use Case #4.3b On A Use Case Diagram.
it('Store Owner : Allow store owners to view a joined member of a given competition.', async()=>{

  const doc = myUser.firestore().collection('stores')
  .doc(someId).collection('store_competitions').doc(someId)
  .collection('competition_joined_members').doc(someId);
  await assertSucceeds(doc.get());
      
}); // Working As Expected.

// Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
// Use Case #4.3b On A Use Case Diagram.
it('Admin : Allow admins to view a joined member of a given competition.', async()=>{

  const doc = myUser.firestore().collection('stores')
  .doc(someId).collection('store_competitions').doc(someId)
  .collection('competition_joined_members').doc(someId);
  await assertSucceeds(doc.get());
      
}); // Working As Expected.




// Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
// Use Case #4.3b On A Use Case Diagram.
it('Offline User : Allow not logged in users to view some of the joined members of a given competition.', async()=>{

    const docs = noUser.firestore().collection('stores')
    .doc(someId).collection('store_competitions').doc(someId)
    .collection('competition_joined_members');
    await assertSucceeds(docs.get());
        
}); // Working As Expected.

// Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
// Use Case #4.3b On A Use Case Diagram.
it('Online User : Allow logged in users to view some of the joined members of a given competition.', async()=>{

  const docs = myUser.firestore().collection('stores')
  .doc(someId).collection('store_competitions').doc(someId)
  .collection('competition_joined_members');
  await assertSucceeds(docs.get());
      
}); // Working As Expected.

// Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
// Use Case #4.3b On A Use Case Diagram.
it('Store Owner : Allow store owners to view some of the joined members of a given competition.', async()=>{

  const docs = storeOwnerUser.firestore().collection('stores')
  .doc(someId).collection('store_competitions').doc(someId)
  .collection('competition_joined_members');
  await assertSucceeds(docs.get());
      
}); // Working As Expected.

// Testing /stores/storeId/store_competitions/competitonId/competition_joined_members/{competitionJoinedMemberUserId}
// Use Case #4.3b On A Use Case Diagram.
it('Admin : Allow admins view some of the joined members of a given competition.', async()=>{

  const docs = adminUser.firestore().collection('stores')
  .doc(someId).collection('store_competitions').doc(someId)
  .collection('competition_joined_members');
  await assertSucceeds(docs.get());
      
}); // Working As Expected.


// clear & npm test

  
  // Testing /users/userId
  // Use Case #1.1a, #1.2 On A Use Case Diagram.
  it('Offline User: Only allow not logged in users to create a new account assuming they do not want to become admins.', async()=>{

    const doc = noUser.firestore().collection('users')
    .doc(someId);
    await assertSucceeds(doc.set({data:'new data', isAdmin:false}));
      
  }); // Working As Expected.

  // Testing /users/userId
  // Use Case #1.1a, #1.2 On A Use Case Diagram.
  it('Offline User: Do not allow not logged in users who want to be registered as admins.', async()=>{

    const doc = noUser.firestore().collection('users')
    .doc(someId);
    await assertFails(doc.set({data:'new data', isAdmin:true}));
      
  }); // Working As Expected.

  // Testing /users/userId
  // Use Case #1.1a, #1.2 On A Use Case Diagram.
  it('Online User: Do not allow logged in users to create a new account if they already have one.', async()=>{

    const doc = myUser.firestore().collection('users')
    .doc(someId);
    await assertFails(doc.set({data:'new data', isAdmin:false}));
      
  }); // Working As Expected.

  // Testing /users/userId
  // Use Case #1.1a, #1.2 On A Use Case Diagram.
  it('Store Owner: Do not allow store owners to create a new account if they already have one.', async()=>{

    const doc = storeOwnerUser.firestore().collection('users')
    .doc(someId);
    await assertFails(doc.set({data:'new data', isAdmin:false}));
      
  }); // Working As Expected.

  // Testing /users/userId
  // Use Case #1.1a, #1.2 On A Use Case Diagram.
  it('Admin : Do not allow admins to create a new account if they already have one.', async()=>{

    const doc = adminUser.firestore().collection('users')
    .doc(someId);
    await assertFails(doc.set({data:'new data', isAdmin:true}));
      
  }); // Working As Expected.
  

  
  // Testing /stores/storeId
  // Use Case #1.1b, #1.3 On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to create a store account if they won\'t be owning it.', async()=>{

    const doc = noUser.firestore().collection('stores')
    .doc(someId);
    await assertFails(doc.set({data:'new data'}));
      
  }); // Working As Expected.

  // Testing /stores/storeId
  // Use Case #1.1b, #1.3 On A Use Case Diagram.
  it('Offline User : Allow not logged in users to create a store account iff they will be owning it.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeName: 'Store ABC',
      sectionName: 'Umlazi AA',
      storeImageLocation: '../path/image.jpg',
      storeOwner: {
        userId: 'store_owner_xyz',
        isOwner: true,
      }
    };
    const doc = noUser.firestore().collection('stores')
    .doc(someId);
    await assertSucceeds(doc.set(store));
      
  }); // Working As Expected.

  // Testing /stores/storeId
  // Use Case #1.1b, #1.3 On A Use Case Diagram.
  it('Online User : Do not allow logged in users to create a store account.', async()=>{

    const doc = myUser.firestore().collection('stores')
    .doc(someId);
    await assertFails(doc.set({data:'new data'}));
      
  }); // Working As Expected.

  // Testing /stores/storeId
  // Use Case #1.1b, #1.3 On A Use Case Diagram.
  it('Store Owner : Do not allow a store owner to create a store account.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(someId);
    await assertFails(doc.set({data:'new data'}));
      
  }); // Working As Expected.

  // Testing /stores/storeId
  // Use Case #1.1b, #1.3 On A Use Case Diagram.
  it('Admin : Do not allow an admin to create a store account.', async()=>{

    const doc = adminUser.firestore().collection('stores')
    .doc(someId);
    await assertFails(doc.set({data:'new data'}));
      
  }); // Working As Expected.
  


  
  // Testing /stores/storeId
  // Use Case #1.1d On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to view a store account.', async()=>{

    const doc = noUser.firestore().collection('stores')
    .doc(someId);
    await assertFails(doc.get());
      
  }); // Working As Expected.


  // Testing /stores/storeId
  // Use Case #1.1d On A Use Case Diagram.
  it('Online User : Do not allow logged in users to view a store account.', async()=>{

    const doc = myUser.firestore().collection('stores')
    .doc(someId);
    await assertFails(doc.get());
      
  }); // Working As Expected.

  // Testing /stores/storeId
  // Use Case #1.1d On A Use Case Diagram.
  it('Store Owner : Allow a store owner to view a store account.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(someId);
    await assertSucceeds(doc.get());
      
  }); // Working As Expected.

  // Testing /stores/storeId
  // Use Case #1.1d On A Use Case Diagram.
  it('Admin : Allow an admin to view a store account.', async()=>{

    const doc = adminUser.firestore().collection('stores')
    .doc(someId);
    await assertSucceeds(doc.get());
      
  }); // Working As Expected.
  


  
  
  // Testing /stores/storeId
  // Use Case #1.1c On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to update a store account.', async()=>{

    const store = {
      storeId: 'store_id',
      storeName: 'store_abc',
      storeOwner: storeOwnerData,
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const doc = noUser.firestore().collection('stores').doc(store.storeId);
    await assertFails(doc.update({storeName:'new data'}));
      
  }); // Working As Expected.

  // Testing /stores/storeId
  // Use Case #1.1c On A Use Case Diagram.
  it('Online User : Do not allow logged in users to create a store account.', async()=>{

    const store = {
      storeId: 'store_id',
      storeName: 'store_abc',
      storeOwner: storeOwnerData,
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const doc = myUser.firestore().collection('stores').doc(store.storeId);
    await assertFails(doc.update({storeName:'new data'}));
      
  }); // Working As Expected.

  // Testing /stores/storeId
  // Use Case #1.1c On A Use Case Diagram.
  it('Store Owner : Do not allow a store owner to update a store account they do not own.', async()=>{

    const store = {
      storeId: 'store_id',
      storeName: 'store_abc',
      storeOwner: theirUserData,
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const doc = storeOwnerUser.firestore().collection('stores').doc(store.storeId);
    await assertFails(doc.update({storeName:'new data'}));
      
  }); // Working As Expected.

  // Testing /stores/storeId
  // Use Case #1.1c On A Use Case Diagram.
  it('Store Owner : Allow a store owner to update a store account they own.', async()=>{

    const store = {
      storeId: 'store_id',
      storeName: 'store_abc',
      storeOwner: storeOwnerData,
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const doc = storeOwnerUser.firestore().collection('stores').doc(store.storeId);
    await assertSucceeds(doc.update({storeName:'new data'}));
      
  }); // Working As Expected.

  // Testing /stores/storeId
  // Use Case #1.1c On A Use Case Diagram.
  it('Admin : Do not allow an admin to update a store account.', async()=>{

    const store = {
      storeId: 'store_id',
      storeName: 'store_abc',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const doc = adminUser.firestore().collection('stores').doc(store.storeId);
    await assertFails(doc.update({storeName:'new data'}));
      
  }); // Working As Expected.
  


  
  // Use Case #1.1d On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to delete a store account.', async()=>{

    
    const doc = noUser.firestore().collection('stores')
    .doc(someId);
    await assertFails(doc.delete());
      
  }); // Working As Expected.

  // Testing /stores/storeId
  // Use Case #1.1d On A Use Case Diagram.
  it('Online User : Do not allow logged in users to delete a store account.', async()=>{

    const doc = myUser.firestore().collection('stores')
    .doc(someId);
    await assertFails(doc.delete());
      
  }); // Working As Expected.

  // Testing /stores/storeId
  // Use Case #1.1d On A Use Case Diagram.
  it('Store Owner : Do not allow a store owner to delete a store account.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(someId);
    await assertFails(doc.delete());
      
  }); // Working As Expected.

  // Testing /stores/storeId
  // Use Case #1.1d On A Use Case Diagram.
  it('Admin : Allow an admin to delete a store account.', async()=>{

    const doc = adminUser.firestore().collection('stores')
    .doc(someId);
    await assertSucceeds(doc.delete());
      
  }); // Working As Expected.
  



  
  // Testing /stores/storeId/store_joined_members/userId
  // Use Case #2.1 On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to become a member of a store.', async()=>{

    const store = {
      storeId: 'store_abc',
    };

    const doc = noUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_joined_members')
    .doc(someId);

    await assertFails(doc.set({data:'new data'}));
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_joined_members/userId
  // Use Case #2.1 On A Use Case Diagram.
  it('Online User : Do not allow logged in users who have already joined the store to join it again.', async()=>{

    const store = {
      storeId: 'store_abc',
    };

    // Add the user to be a store member.
    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .collection('store_joined_members').doc(myUserData.userId)
      .set(myUserData);
    });

    // Add a user to be a store member again.
    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_joined_members')
    .doc(myUserData.userId);

    await assertFails(doc.set(myUserData));
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_joined_members/userId
  // Use Case #2.1 On A Use Case Diagram.
  it('Online User : Allow logged in users to become a member of a store.', async()=>{

    const store = {
      storeId: 'store_abc',
    };

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_joined_members')
    .doc(myUserData.userId);

    await assertSucceeds(doc.set(myUserData));
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_joined_members/userId
  // Use Case #2.1 On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to become a member of a store.', async()=>{

    const store = {
      storeId: 'store_abc',
    };

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_joined_members')
    .doc(storeOwnerData.userId);

    await assertFails(doc.set(storeOwnerData));
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_joined_members/userId
  // Use Case #2.1 On A Use Case Diagram.
  it('Admin : Do not allow admins to become a member of a store.', async()=>{

    const store = {
      storeId: 'store_abc',
    };

    const doc = adminUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_joined_members')
    .doc(adminData.userId);

    await assertFails(doc.set(storeOwnerData));
      
  }); // Working As Expected.
  


  /*
  // Testing /stores/storeId/store_joined_members/userId
  // Use Case # On A Use Case Diagram.
  it('Offline User : Allow not logged in users to view store members.', async()=>{

    const doc = noUser.firestore().collection('stores')
    .doc(someId).collection('store_joined_members')
    .doc(someId);

    await assertSucceeds(doc.get());
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_joined_members/userId
  // Use Case # On A Use Case Diagram.
  it('Online User : Allow logged in users to view store members.', async()=>{

    const doc = myUser.firestore().collection('stores')
    .doc(someId).collection('store_joined_members')
    .doc(someId);

    await assertSucceeds(doc.get());
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_joined_members/userId
  // Use Case # On A Use Case Diagram.
  it('Store Owner : Allow store owners to view store members.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(someId).collection('store_joined_members')
    .doc(someId);

    await assertSucceeds(doc.get());
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_joined_members/userId
  // Use Case # On A Use Case Diagram.
  it('Admin : Allow admins to view store members.', async()=>{

    const doc = adminUser.firestore().collection('stores')
    .doc(someId).collection('store_joined_members')
    .doc(someId);

    await assertSucceeds(doc.get());
      
  });
  */


  
  /*
  // Testing /stores/storeId/store_joined_members/userId
  // Use Case #2.2 On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to leave a store.', async()=>{

    const store = {
      storeId: 'store_abc',
    };

    const doc = noUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_joined_members')
    .doc(someId);

    await assertFails(doc.delete());
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_joined_members/userId
  // Use Case #2.2 On A Use Case Diagram.
  it('Online User : Do not allow logged in users who are not members of a store to leave it.', async()=>{

    const store = {
      storeId: 'store_abc',
    };

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_joined_members')
    .doc(myUserData.userId);

    await assertFails(doc.delete());
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_joined_members/userId
  // Use Case #2.2 On A Use Case Diagram.
  it('Online User : Allow logged in users who are members of a store to leave it.', async()=>{

    const store = {
      storeId: 'store_abc',
    };

    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .collection('store_joined_members')
      .doc(myUserData.userId)
      .set(myUserData);
    });

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_joined_members')
    .doc(myUserData.userId);

    await assertSucceeds(doc.delete());
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_joined_members/userId
  // Use Case #2.2 On A Use Case Diagram.
  it('Online User : Do not allow logged in users to delete another user from store members.', async()=>{

    const store = {
      storeId: 'store_abc',
    };

    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .collection('store_joined_members')
      .doc(theirUserData.userId)
      .set(theirUserData);
    });

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_joined_members')
    .doc(theirUserData.userId);

    await assertFails(doc.delete());
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_joined_members/userId
  // Use Case #2.3 On A Use Case Diagram.
  it('Store Owner : Allow store owners to remove store joined members from their stores.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: storeOwnerData,
    };

    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores')
      .doc(store.storeId)   
      .set(store);
    });

    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .collection('store_joined_members')
      .doc(theirUserData.userId)
      .set(theirUserData);
    });

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_joined_members')
    .doc(theirUserData.userId);

    await assertSucceeds(doc.delete());
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_joined_members/userId
  // Use Case #2.2 On A Use Case Diagram.
  it('Admin : Do not allow admins to leave a store because they are unable to join it in the first place.', async()=>{

    const store = {
      storeId: 'store_abc',
    };

    const doc = adminUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_joined_members')
    .doc(someId);

    await assertFails(doc.delete());
      
  }); // Working As Expected.
  


  
  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  // Use Case #3 On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to add alcohol to a store.', async()=>{

    const store = {
      storeId: 'store_abc',
    };

    const doc = noUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_alcohol')
    .doc(someId);

    await assertFails(doc.set({data: 'new data'}));
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  // Use Case #3 On A Use Case Diagram.
  it('Online User : Do not allow logged in users to add alcohol to a store.', async()=>{

    const store = {
      storeId: 'store_abc',
    };

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_alcohol')
    .doc(someId);

    await assertFails(doc.set({data: 'new data'}));
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  // Use Case #3 On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to add alcohol to a store they do not own.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: theirUserData
    };

    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    })

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_alcohol')
    .doc(someId);

    await assertFails(doc.set({data: 'new data'}));
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  // Use Case #3 On A Use Case Diagram.
  it('Store Owner : Allow store owners to add alcohol to a store they own.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeOwner: storeOwnerData
    };

    await testEnv.withSecurityRulesDisabled(context =>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    })

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_alcohol')
    .doc(someId);

    await assertSucceeds(doc.set({data: 'new data'}));
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  // Use Case #3 On A Use Case Diagram.
  it('Admin : Do not allow admins to add alcohol to a store.', async()=>{

    const store = {
      storeId: 'store_abc',
    };

    const doc = adminUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_alcohol')
    .doc(someId);

    await assertFails(doc.set({data: 'new data'}));
      
  }); // Working As Expected.
  


  
  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  // Use Case #3 On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to view store alcohol.', async()=>{

    const doc = noUser.firestore().collection('stores')
    .doc(someId).collection('store_alcohol')
    .doc(someId);

    await assertFails(doc.get());
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  // Use Case #3 On A Use Case Diagram.
  it('Online User : Do not allow logged in users who are not a member of a store to view store alcohol.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeName: 'xxx',
    };

    // Save a store to refer to.
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(store.storeId).set(store);
    });

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_alcohol')
    .doc(someId);

    await assertFails(doc.get());
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  // Use Case #3 On A Use Case Diagram.
  it('Online User : Allow logged in users who are members of a store to view store alcohol.', async()=>{

    const store = {
      storeId: 'store_abc',
      storeName: 'xxx',
    };

    // Save a store to refer to.
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(store.storeId).set(store);
    });

    // Save a joined member
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores')
      .doc(store.storeId).collection('store_joined_members')
      .doc(myUserData.userId).set(myUserData);
    });

    const doc = myUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_alcohol')
    .doc(someId);

    await assertSucceeds(doc.get());
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  // Use Case #3 On A Use Case Diagram.
  it('Store Owner : Allow store owners to view store alcohol.', async()=>{

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(someId).collection('store_alcohol')
    .doc(someId);

    await assertSucceeds(doc.get());
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  // Use Case #3 On A Use Case Diagram.
  it('Admin : Allow admins to view store alcohol.', async()=>{

    const doc = adminUser.firestore().collection('stores')
    .doc(someId).collection('store_alcohol')
    .doc(someId);

    await assertSucceeds(doc.get());
      
  }); // Working As Expected.
  


  
  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  // Use Case #3 On A Use Case Diagram.
  it('Offline User : Do not allow not logged in users to delete store alcohol.', async()=>{

    const doc = myUser.firestore().collection('stores')
    .doc(someId).collection('store_alcohol')
    .doc(someId);

    await assertFails(doc.delete());
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  // Use Case #3 On A Use Case Diagram.
  it('Online User : Do not allow logged in users to delete store alcohol.', async()=>{

    const doc = myUser.firestore().collection('stores')
    .doc(someId).collection('store_alcohol')
    .doc(someId);

    await assertFails(doc.delete());
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  // Use Case #3 On A Use Case Diagram.
  it('Store Owner : Do not allow store owners to delete store alcohol belonging to another owner\'s store.', async()=>{

    const store  ={
      storeId: 'store_id',
      storeName: 'store_abc',
      storeOwner: {
        isOwner: true,
        userId: 'just_user',
      },
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_alcohol')
    .doc(someId);

    await assertFails(doc.delete());
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  // Use Case #3 On A Use Case Diagram.
  it('Store Owner : Allow store owners to delete store alcohol belonging to their stores.', async()=>{

    const store  ={
      storeId: 'store_id',
      storeName: 'store_abc',
      storeOwner: storeOwnerData,
    };

    // Save store to refer to.
    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores').doc(store.storeId)
      .set(store);
    });

    const doc = storeOwnerUser.firestore().collection('stores')
    .doc(store.storeId).collection('store_alcohol')
    .doc(someId);

    await assertSucceeds(doc.delete());
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  // Use Case #3 On A Use Case Diagram.
  it('Admin : Do not allow admins to delete store alcohol.', async()=>{

    const doc = adminUser.firestore().collection('stores')
    .doc(someId).collection('store_alcohol')
    .doc(someId);

    await assertFails(doc.delete());
      
  }); // Working As Expected.
  

  
  /*
  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  it('Offline User : Do not allow not logged in users to update store alcohol.', async()=>{

    const alcohol = {
      alcoholId: 'alcohol_xyz',
      data: 'old data',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores').doc(someId)
      .collection('store_alcohol').doc(alcohol.alcoholId).set(alcohol);
    });

    const doc = noUser.firestore().collection('stores')
    .doc(someId).collection('store_alcohol')
    .doc(alcohol.alcoholId);

    await assertFails(doc.update({data:'new data'}));
      
  }); // Working As Expected.


  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  it('Online User : Do not allow logged in users to update store alcohol.', async()=>{

    const alcohol = {
      alcoholId: 'alcohol_xyz',
      data: 'old data',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores').doc(someId)
      .collection('store_alcohol').doc(alcohol.alcoholId).set(alcohol);
    });

    const doc = myUser.firestore().collection('stores')
    .doc(someId).collection('store_alcohol')
    .doc(alcohol.alcoholId);

    await assertFails(doc.update({data:'new data'}));
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  it('Store Owner : Do not allow store owners to update store alcohol.', async()=>{

    const alcohol = {
      alcoholId: 'alcohol_xyz',
      data: 'old data',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores').doc(someId)
      .collection('store_alcohol').doc(alcohol.alcoholId).set(alcohol);
    });

    const doc = adminUser.firestore().collection('stores')
    .doc(someId).collection('store_alcohol')
    .doc(alcohol.alcoholId);

    await assertFails(doc.update({data:'new data'}));
      
  }); // Working As Expected.

  // Testing /stores/storeId/store_alcohol/storeAlcoholId
  it('Admin : Do not allow admins to update store alcohol.', async()=>{

    const alcohol = {
      alcoholId: 'alcohol_xyz',
      data: 'old data',
    };

    await testEnv.withSecurityRulesDisabled(context=>{
      return context.firestore().collection('stores').doc(someId)
      .collection('store_alcohol').doc(alcohol.alcoholId).set(alcohol);
    });

    const doc = adminUser.firestore().collection('stores')
    .doc(someId).collection('store_alcohol')
    .doc(alcohol.alcoholId);

    await assertFails(doc.update({data:'new data'}));
      
  }); // Working As Expected.
  */


  
  // Testing /competitions/competitionId
  // Use Case #7b On A Use Case Diagram.
  it('Offline User : Allow not logged in users to watch a live competition.', async()=>{

    const doc = noUser.firestore().collection('competitions')
    .doc(someId);

    await assertSucceeds(doc.get());
      
  }); 

  // Testing /competitions/competitionId
  // Use Case #7b On A Use Case Diagram.
  it('Online User : Allow logged in users to watch a live competition.', async()=>{

    const doc = myUser.firestore().collection('competitions')
    .doc(someId);

    await assertSucceeds(doc.get());
      
  }); 

  // Testing /competitions/competitionId
  // Use Case #7b On A Use Case Diagram.
  it('Store Owner : Allow store owners to watch a live competition.', async()=>{

    const doc = storeOwnerUser.firestore().collection('competitions')
    .doc(someId);

    await assertSucceeds(doc.get());
      
  }); 

  // Testing /competitions/competitionId
  // Use Case #7b On A Use Case Diagram.
  it('Admin : Allow admins to watch a live competition.', async()=>{

    const doc = adminUser.firestore().collection('competitions')
    .doc(someId);

    await assertSucceeds(doc.get());
      
  }); 

  // clear & npm test
});