import 'dart:math';

import '../models/old_conversation.dart';

import 'graph theory/location.dart';
import 'graph theory/locations_graph.dart';
import 'graph theory/section_name.dart';
import 'graph theory/utilities.dart' as gut;
import 'old_comment.dart';

import 'old_competition.dart';
import 'old_grand_price.dart';

import 'alcohol.dart';
import 'old_beg_request.dart';
import 'old_message.dart';
import 'old_owner.dart';
import 'old_player.dart';
import 'old_post.dart';
import 'old_store.dart';
import 'old_user.dart';
import 'old_won_price.dart';
import 'utilities.dart' as ut;


class SampleForTesting{

  static Map<SectionName, List<String>> sectionStores = {};

  static final List<Player> allRegisteredPlayers = [];

  static final List<Owner> allRegisteredOwners = [];
  static final List<Store> allRegisteredStores = [];

  static final List<Alcohol> allRegisteredAlcohol = [];
  
  final List<GrandPrice> allRegisteredGrandPrices = [];
  final List<Competition> allRegisteredCompetitions = [];
  final List<WonPrice> allRegisteredWonPrices = [];

  
  
  SampleForTesting(){
    initializeStoresForAllSections();
    
    
    createPlayers();
    // Stores are created together with owners.
    // However they don't have any joined members nor do the have competitions.
    createOwners(); 
    // Add customers to stores and stores to customers.
    addJoinedMembersOnStores();

    createAlcohol();
    createGrandPrices();
    // The competitions don't have winners.
    createCompetitions();
    
    document.replaceAll('-','');
    document.trim();
    createPosts();
    createComments();

    createWonPrices();
    createWinnerBeggers();
    respondToWinnerBeggers();

    createPeopleWhoKnowHimOrHer();
    createOnlinePeople();
    createAlcoholics();
    createConversations();
    
  }

  // Each Section Has 1-3 Stores.
  void initializeStoresForAllSections(){
    
    var storeNames = [
      'KwaNkuxa', 
      'KwaNomusa', 
      'Emathayini', 
      'Mazithanqaze', 
      'Obubandayo',
      'Zulu T.shop',
      'Brash',
      'Zenzele Liqior',
      'Shona Khona', 
      'Asambe Mf2', 
      'Jombigazi', 
      'Wafutshwala', 
      '626 Tavern',
      'Ezinkukhwini',
      'Sure Case',
      'Lu\'s Corner',
      'Car Wash Sbu'
      'Ola Lapho',

    ];

    for(int i = 0; i< 27; i++){
      int numberOfSectionStores = Random().nextInt(3)+1;
      List<String> stores = [];
      for(int i = 0; i < numberOfSectionStores;i++){
        stores.add(storeNames[Random().nextInt(storeNames.length)]);
      }
      sectionStores.addAll({gut.Utilities.asSectionName(i):stores});
    }
  }

  // Create all registered players
  void createPlayers(){

    if(allRegisteredPlayers.isNotEmpty){return;}

    List<String> usernames(){
      
      List<String> usernames = [];
      String charactersToChooseFrom = 'abcdefghijklmnopqrstuvwxyz0123456789';
      Random random = Random();
      
      for(int j = 100;j>0;j--){
        int randomLength = random.nextInt(6)+5;
        String username = '';
        for(int i = 1; i<=randomLength;i++){
          username += charactersToChooseFrom[i-1];
        }
        usernames.add(username);
      }

      return usernames;
    }
  
    List<String> passwords(){

      List<String> passwords = [];
      String charactersToChooseFrom = '0123456789';
      Random random = Random();
      
      for(int j = 100;j>0;j--){
        int randomLength = random.nextInt(6)+5;
        String password = '';
        for(int i = 1; i<=randomLength;i++){
          password += charactersToChooseFrom[i-1];
        }
        passwords.add(password);
      }

      return passwords;
    }
    
    List<String> cellNumbers(){
      Random random = Random();
      String numbers = '0123456789';
      List<String> cellNumbers = [];

      for(int i = 100; i>0;i--){
        String number = '';
        switch(random.nextInt(3)){
          case 0 : number += '06'; break;
          case 1 : number += '07'; break;
          default: number += '08'; 
        }
        for(int j = 1; j <=8;j++){
          number += numbers[random.nextInt(numbers.length)];
        }
        cellNumbers.add(number);
      }
      return cellNumbers;
    }
  
    List<bool> genders(){
      List<bool> genders = [];
      for(int i = 100; i > 0;i--){
        genders.add(Random().nextBool());
      }
      return genders;
    }
  
    List<String> picPaths(){
      List<String> paths = [];
      for(int i = 100; i > 0;i--){
        paths.add('assets/player/');
      }
      return paths;
    }

    List<String> picNames(){
      List<String> names = [];
      for(int i = 100; i > 0;i--){
        names.add('${100-i}.jpg');
      }
      return names;
    }

    List<SectionName> sectionNames(){
      List<SectionName> sectionNames = [];
      
      for(int j = 100;j>0;j--){
        sectionNames.add(gut.Utilities.asSectionName(Random().nextInt(27)));
      }

      return sectionNames;
    }

    

    for(int i = 0; i < 100; i++){
      allRegisteredPlayers.add(Player(
        username: usernames()[i],
        password: passwords()[i],
        cellNumber: cellNumbers()[i],
        sectionName: sectionNames()[i],
        isMale: genders()[i],
        picPath: picPaths()[i],
        picName: picNames()[i],
      ));
    }

    
  }

  // Create all registered owners.
  void createOwners(){

    if(allRegisteredOwners.isNotEmpty){return;}

    List<String> usernames(){
      
      List<String> usernames = [];
      String charactersToChooseFrom = 'abcdefghijklmnopqrstuvwxyz0123456789';
      Random random = Random();
      
      for(int j = 30;j>0;j--){
        int randomLength = random.nextInt(6)+5;
        String username = '';
        for(int i = 1; i<=randomLength;i++){
          username += charactersToChooseFrom[i-1];
        }
        usernames.add(username);
      }

      return usernames;
    }
  
    List<String> passwords(){

      List<String> passwords = [];
      String charactersToChooseFrom = 'ABCDE';
      Random random = Random();
      
      for(int j = 100;j>0;j--){
        int randomLength = random.nextInt(5);
        String password = '';
        for(int i = 1; i<=randomLength;i++){
          password += charactersToChooseFrom[i-1];
        }
        passwords.add(password);
      }

      return passwords;
    }
    
    List<String> fullnames(){
      
      List<String> fullnames = [];
      String charactersToChooseFrom = 'abcdefghijklmnopqrstuvwxyz0123456789';
      Random random = Random();
      
      for(int j = 30;j>0;j--){
        int randomLength = random.nextInt(6)+5;
        String fullname = 'Full Name - ';
        for(int i = 1; i<=randomLength;i++){
          fullname += charactersToChooseFrom[i-1];
        }
        fullnames.add(fullname);
      }

      return fullnames;
    }
  
    List<String> surnames(){
      
      List<String> surnames = [];
      String charactersToChooseFrom = 'abcdefghijklmnopqrstuvwxyz0123456789';
      Random random = Random();
      
      for(int j = 30;j>0;j--){
        int randomLength = random.nextInt(6)+5;
        String surname = 'Surname - ';
        for(int i = 1; i<=randomLength;i++){
          surname += charactersToChooseFrom[i-1];
        }
        surnames.add(surname);
      }

      return surnames;
    }

    List<String> cellNumbers(){
      Random random = Random();
      String numbers = '0123456789';
      List<String> cellNumbers = [];

      for(int i = 30; i>0;i--){
        String number = '';
        switch(random.nextInt(3)){
          case 0 : number += '06'; break;
          case 1 : number += '07'; break;
          default: number += '08'; 
        }
        for(int j = 1; j <=8;j++){
          number += numbers[random.nextInt(numbers.length)];
        }
        cellNumbers.add(number);
      }
      return cellNumbers;
    }
  
    List<int> ids(){
      String numbers = '0123456789';
      String id = '';
      List<int> ids = [];
      for(int i = 30; i >0;i--){
        for(int j = 1; j <=13;j++){
          id += numbers[Random().nextInt(10)];
        }
        ids.add(id as int);
      }

      return ids;
    }

    List<bool> genders(){
      List<bool> genders = [];
      for(int i = 100; i > 0;i--){
        genders.add(Random().nextBool());
      }
      return genders;
    }
  
    List<String> imageLocations(){
      List<String> imageLocation = [];
      for(int i = 30; i > 0;i--){
        imageLocation.add('assets/owner/$i.jpg');
      }
      return imageLocation;
    }

    List<SectionName> sectionNames(){
      List<SectionName> sectionNames = [];
      
      for(int j = 100;j>0;j--){
        sectionNames.add(gut.Utilities.asSectionName(Random().nextInt(27)));
      }

      return sectionNames;
    }

    for(int i = 0; i < 30; i++){
      Store store = createStore(sectionNames()[i]);
      allRegisteredOwners.add(Owner(
        store: store,
        fullName: fullnames()[i],
        surname: surnames()[i],
        idNumber: ids()[i],
        username: usernames()[i],
        password: passwords()[i],
        cellNumber: cellNumbers()[i],
        isMale: genders()[i],
        sectionName: sectionNames()[i],
        imageLocation: imageLocations()[i],
      ));
      allRegisteredStores.add(store);
    }

    
    
  }

  // Add customers to this store and stores to customers.
  void addJoinedMembersOnStores(){

    for(Store store in allRegisteredStores){
      if(store.joinedMembers.isNotEmpty){
        return;
      }
    }
    
    int randomNumberOfStores = Random().nextInt(allRegisteredStores.length);
    List<Store> storesList = [];
    for(Store store in allRegisteredStores){
      storesList.add(store);
    }
    storesList.shuffle();

    for(int i = 0; i < randomNumberOfStores;i++){
      Store store = storesList[i];
      Map<User,String> joinedMembers = {};
      int randomNumberOfCustomersToAdd = Random().nextInt(50);
      
      User? user;
      int customerNo = 0;
      for(; customerNo < randomNumberOfCustomersToAdd*0.75;customerNo++){
        
        do{
          user = allRegisteredPlayers[Random().nextInt(allRegisteredPlayers.length)];
        }while(joinedMembers.keys.contains(user));

        joinedMembers[user] = random3Letters();
      }

      for(customerNo = randomNumberOfCustomersToAdd*0.75 as int; 
      customerNo < randomNumberOfCustomersToAdd;customerNo++){
        
        do{
          user = allRegisteredOwners[Random().nextInt(allRegisteredOwners.length)];
        }while(joinedMembers.keys.contains(user));

        joinedMembers[user] = random3Letters();
        user.joinedStores.add(store); // Add store to user's joined stores.
      }

      store.joinedMembers = joinedMembers;
    }
    
  }

  // Create all registered stores without join members nor competitions.
  Store createStore(SectionName sectionName){

    List<String> allStoresOfASection = sectionStores[sectionName]!;
    String storeName = allStoresOfASection[Random().nextInt(allStoresOfASection.length)]; 

    Store store = Store(
      storeName: storeName, 
      picPath: 'assets/store/', 
      picName: '${gut.Utilities.asIndex(storeName)}.jpg', 
      address: gut.Utilities.asString(sectionName),
      sectionName: sectionName,
      
    );

    return store;
  }
  
  // Create all registered alcohol.
  void createAlcohol(){

    if(allRegisteredAlcohol.isNotEmpty){return;}

    var descriptions = [

      //================================Cider================================
      'Savana 24x330ml',
      'Savana 12x330ml',
      'Savana 6x330ml',
      'Savana 24x360ml',
      'Savana 12x360ml',
      'Savana 6x360ml',

      //================================Beer================================
      
      'Castle Milk Stout 24x330ml',
      'Castle Milk Stout 12x330ml',
      'Castle Milk Stout 6x330ml',
      'Castle Milk Stout 24x360ml',
      'Castle Milk Stout 12x360ml',
      'Castle Milk Stout 6x330ml',
      'Castle Milk Stout 24x500ml',
      'Castle Milk Stout 12x500ml',
      'Castle Milk Stout 6x500ml',
      'Castle Milk Stout 12x750ml',
      
      'Amstel Lagar 24x330ml',
      'Amstel Lagar 12x330ml',
      'Amstel Lagar 6x330ml',
      'Amstel Lagar 24x360ml',
      'Amstel Lagar 12x360ml',
      'Amstel Lagar 6x360ml',
      'Amstel Lagar 24x500ml',
      'Amstel Lagar 12x500ml',
      'Amstel Lagar 6x500ml',
      'Amstel Lagar 12x750ml',

      'Castle Lite 24x330ml',
      'Castle Lite 12x330ml',
      'Castle Lite 6x330ml',
      'Castle Lite 24x360ml',
      'Castle Lite 12x360ml',
      'Castle Lite 6x360ml',
      'Castle Lite 24x500ml',
      'Castle Lite 12x500ml',
      'Castle Lite 6x500ml',
      'Castle Lite 12x750ml',

      'Castle Lagar 24x330ml',
      'Castle Lagar 12x330ml',
      'Castle Lagar 6x330ml',
      'Castle Lagar 24x360ml',
      'Castle Lagar 12x360ml',
      'Castle Lagar 6x360ml',
      'Castle Lagar 24x500ml',
      'Castle Lagar 12x500ml',
      'Castle Lagar 6x500ml',
      'Castle Lagar 12x750ml',

      'Heineken 24x330ml',
      'Heineken 12x330ml',
      'Heineken 6x330ml',
      'Heineken 24x360ml',
      'Heineken 12x360ml',
      'Heineken 6x360ml',
      'Heineken 24x500ml',
      'Heineken 12x500ml',
      'Heineken 6x500ml',
      'Heineken 12x750ml',

      'Miller 24x330ml',
      'Miller 12x330ml',
      'Miller 6x330ml',
      'Miller 24x360ml',
      'Miller 12x360ml',
      'Miller 6x360ml',
      'Miller 24x500ml',
      'Miller 12x500ml',
      'Miller 6x500ml',
      'Miller 12x750ml',

      'Carling Black Label 24x330ml',
      'Carling Black Label 12x330ml',
      'Carling Black Label 6x330ml',
      'Carling Black Label 24x360ml',
      'Carling Black Label 12x360ml',
      'Carling Black Label 6x360ml',
      
      ];
    Random random = Random();
    
    for(int alcoholIndex = 0; alcoholIndex < descriptions.length;alcoholIndex++){
      String name = descriptions[alcoholIndex];
      allRegisteredAlcohol.add(
        Alcohol(
          fullname: name, 
          volume: name.substring(name.lastIndexOf('x')+1), 
          alcoholPercent: random.nextDouble()*45 + 5 as String, 
          imageLocation: 'assets/alcohol/ + $alcoholIndex.jpg', 
          price: random.nextDouble()*100,
          alcoholType: alcoholIndex<6?ut.AlcoholType.cider:ut.AlcoholType.beer,
        )
      );
    }
  }
  
  // Create all registered grand prices.
  void createGrandPrices(){

    
    Random random = Random();
    int numberOfGrandPrices = random.nextInt(100)+30;
    for(int i = 0; i < numberOfGrandPrices;i++){
      int numberOfAlcohols = random.nextInt(3)+1;
      
      List<Alcohol> drinks = [];
      String description = '';

      for(int i = 0; i < numberOfAlcohols;i++){
        drinks[i] = allRegisteredAlcohol[random.nextInt(allRegisteredAlcohol.length)];
        description += drinks[i].fullname;
        if(i+1<numberOfAlcohols){
          description += ' + ';
        }
      }

      allRegisteredGrandPrices.add(GrandPrice(
        isPointed: false, 
        drinks: drinks, 
        description: description
      ));
    }

  }

  // Create all registerd competitions with no winners yet.
  void createCompetitions(){
    
    Random random = Random();
    int numberOfCompetitions = random.nextInt(30)+20;

    for(int competitionNumber = 0; competitionNumber<numberOfCompetitions;competitionNumber++){
      var numberOfPricesList = [4,6,8,9];
      int maxNoOfGrandPrices = numberOfPricesList[random.nextInt(numberOfPricesList.length)];

      List<GrandPrice> grandPrices = [];

      for(int i = 0; i < maxNoOfGrandPrices;i++){
        grandPrices.add(allRegisteredGrandPrices[(random.nextInt(allRegisteredGrandPrices.length))]);
      }

      grandPrices[random.nextInt(maxNoOfGrandPrices)].isPointed = true;

      List<User> createCompetitors(){

    Random random = Random();
    int numberOfCompetitors = random.nextInt(50);
    
    List<User> competitors = [];
    
    List<Player> players = [];
    for(Player player in allRegisteredPlayers){
      players.add(player);
    }
    players.shuffle();
    for(int i = 0; i<(numberOfCompetitors*.8 as int);i++){
      competitors.add(players[i]);
    }

    List<Owner> owners = [];
    for(Owner owner in allRegisteredOwners){
      owners.add(owner);
    }
    owners.shuffle();
    for(int i = 0; i<numberOfCompetitors-(numberOfCompetitors*.8 as int);i++){
      competitors.add(owners[i]);
    }

    return competitors;
  }


      List<User> competitors = createCompetitors();

      
      

      allRegisteredCompetitions.add(Competition(
        joiningFee: random.nextDouble()*40 + 10, 
        dateTime: DateTime(2023, 12, random.nextInt(30)+1, random.nextInt(24), random.nextInt(60)), 
        maxNoOfGrandPrices: maxNoOfGrandPrices,
        grandPrices:grandPrices,
        competitors: competitors,
        duration: const Duration(minutes: 1, seconds: 30)
      ));
    }
  }
  
  // Create posts without comments.
  void createPosts(){

    for(Store store in allRegisteredStores){
      Random random = Random();
      bool hasPost = random.nextBool();

      if(hasPost && store.joinedMembers.isNotEmpty){
        int numberOfPosts = random.nextInt(20);
        for(int postNumber = 1; postNumber < numberOfPosts;postNumber++){
          User owner = store.joinedMembers.keys.elementAt(random.nextInt(store.joinedMembers.keys.length));
          int postMinIndex = random.nextInt(document.length/2 as int);
          int postMaxIndex = postMinIndex + random.nextInt(100);

          do{
            postMaxIndex = postMinIndex + random.nextInt(100);
          }while(postMaxIndex>=document.length);
          Post post = Post(
            owner: owner,
            text: document.substring(postMinIndex,postMaxIndex),
          );

          store.posts.add(post);
        }
      }
    }
    
  }

  void createComments(){

    Random random = Random();

    for(Store store in allRegisteredStores){
      for(Post post in store.posts){
        bool hasComments = random.nextBool();

        if(hasComments){
          int numberOfComments = random.nextInt(10)+1;
          for(int commentNumber = 1; commentNumber <= numberOfComments;commentNumber++){
            int minCommentIndex = random.nextInt(document.length*.25 as int);
            int maxCommentIndex;
            do{
              maxCommentIndex = minCommentIndex + random.nextInt(document.length*.5 as int);
            }while(maxCommentIndex>=document.length);

            Comment comment = Comment(
              owner: store.joinedMembers.keys.elementAt(random.nextInt(store.joinedMembers.keys.length)), 
              text: document.substring(minCommentIndex, maxCommentIndex),
            );

            post.comments.add(comment);
          }

        }
      }
    }
  }

  // Create all registered Won Prices.
  void createWonPrices(){
    Random random = Random();
    int numberOfWonPrices = random.nextInt(100) +20;
    Competition competition = allRegisteredCompetitions[random.nextInt(allRegisteredCompetitions.length)];
    competition.winner = competition.competitors[random.nextInt(competition.competitors.length)];

    for(int i = 0; i <numberOfWonPrices;i++){
      allRegisteredWonPrices[i] = WonPrice(
        competition: competition,
        store: allRegisteredStores[random.nextInt(allRegisteredStores.length)],
        grandPrice: allRegisteredGrandPrices[random.nextInt(allRegisteredGrandPrices.length)],
      );
    }

  }

  // Create all beggers for each won price.
  void createWinnerBeggers(){

    for(WonPrice wonPrice in allRegisteredWonPrices){
      bool hasBeggers = Random().nextBool();
      if(hasBeggers){
        int numberOfBeggers = Random().nextInt(29) + 1;
        for(int beggerNumber = 1; beggerNumber <= numberOfBeggers;beggerNumber++){
          User winner = wonPrice.competition.winner!;
          int minDescriptionIndex = 0;
          int maxDescriptionIndex;
          do{
            maxDescriptionIndex = minDescriptionIndex + Random().nextInt(100);
          }while(maxDescriptionIndex>=document.length);
          String description = wonPrice.grandPrice.drinks[0].fullname;
          description += '\t';
          description += document.substring(minDescriptionIndex, maxDescriptionIndex);

          User joinedMember = wonPrice.store.joinedMembers.keys.elementAt(
          Random().nextInt(wonPrice.store.joinedMembers.keys.length));

          do{
            joinedMember = wonPrice.store.joinedMembers.keys.elementAt(
            Random().nextInt(wonPrice.store.joinedMembers.keys.length));
          }while(winner.peopleWhoKnowYou.contains(joinedMember));
          
          BegRequest begRequest = BegRequest(
            description: description,
            wonPrice: wonPrice,
            begger: joinedMember,
          );
          // You Can Only Beg People You Know.
          winner.peopleWhoKnowYou.add(joinedMember);
          winner.begRequests.add(begRequest);
        }
      }
    }
  }

  // Respond on some of the beggers.
  void respondToWinnerBeggers(){

    Random random = Random();

    for(WonPrice wonPrice in allRegisteredWonPrices){
      User user = wonPrice.competition.winner!;
    
      for(BegRequest begRequest in user.begRequests){
        int choice = random.nextInt(3);
        if(choice==0){
          begRequest.isAccepted = true;
        }
        else if(choice==1){
          begRequest.isAccepted = false;
        }
      }
    }
  }

  // Create people who know you.
  void createPeopleWhoKnowHimOrHer(){
    Random random = Random();
    for(User player in allRegisteredPlayers){
      
      int numberOfUsers = random.nextInt(30);

      for(int userNumber = 1; userNumber<=numberOfUsers;userNumber++){
        User user;
        do{
          user = (random.nextBool())?
          allRegisteredOwners[allRegisteredOwners.length]:
          allRegisteredPlayers[allRegisteredPlayers.length];
        }while(user.peopleWhoKnowYou.contains(user) || user.cellNumber==user.cellNumber);
        player.peopleWhoKnowYou.add(user);
      }
    }

    for(User owner in allRegisteredOwners){
      
      int numberOfUsers = random.nextInt(30);

      for(int userNumber = 1; userNumber<=numberOfUsers;userNumber++){
        User user;
        do{
          user = (random.nextBool())?
          allRegisteredOwners[allRegisteredOwners.length]:
          allRegisteredPlayers[allRegisteredPlayers.length];
        }while(user.peopleWhoKnowYou.contains(user) || user.cellNumber==user.cellNumber);
        owner.peopleWhoKnowYou.add(user);
      }
    }
  }

  // Create online people.
  void createOnlinePeople(){
    Random random = Random();

    for(User player in allRegisteredPlayers){
      int numberOfUsers = random.nextInt(player.peopleWhoKnowYou.length);
      player.peopleWhoKnowYou.shuffle();

      for(int userNumber = 0; userNumber<numberOfUsers;userNumber++){
        User user = player.peopleWhoKnowYou[userNumber];
        if(!player.onlineUsers.contains(user) 
        && player.cellNumber!=user.cellNumber){
          player.onlineUsers.add(user);
        }
      }
    }

    for(User owner in allRegisteredOwners){
      int numberOfUsers = random.nextInt(owner.peopleWhoKnowYou.length);
      owner.peopleWhoKnowYou.shuffle();

      for(int userNumber = 0; userNumber<numberOfUsers;userNumber++){
        User user = owner.peopleWhoKnowYou[userNumber];
        if(!owner.onlineUsers.contains(user) 
        && owner.cellNumber!=user.cellNumber){
          owner.onlineUsers.add(user);
        }
      }
    }
  }

  // Create alcoholics.
  void createAlcoholics(){
    Random random = Random();
    
    for(Player player in allRegisteredPlayers){
      int numberOfAlcoholics = random.nextInt(player.peopleWhoKnowYou.length/2 as int);
      player.peopleWhoKnowYou.shuffle();
      for(int i = 0; i < numberOfAlcoholics;i++){
        player.alcoholics.add(player.peopleWhoKnowYou.removeAt(i));
      }
    }

    for(Owner owner in allRegisteredOwners){
      int numberOfAlcoholics = random.nextInt(owner.peopleWhoKnowYou.length/2 as int);
      owner.peopleWhoKnowYou.shuffle();
      for(int i = 0; i < numberOfAlcoholics;i++){
        owner.alcoholics.add(owner.peopleWhoKnowYou.removeAt(i));
      }
    }

  }

  // Create all conversations.
  void createConversations(){

    createConversationsFor(true);
    createConversationsFor(false);
    
  }

  void createConversationsFor(bool usingPlayers){

    bool haveTalked(User user1, User user2){
      for(Conversation conv in user1.conversations){
        if(conv.user2.cellNumber==user2.cellNumber){
          return true;
        }
      }

      for(Conversation conv in user2.conversations){
        if(conv.user1.cellNumber==user1.cellNumber){
          return true;
        }
      }

      return false;
    }
    
    Random random = Random();

    List<User> playersOrOwners = usingPlayers?allRegisteredPlayers:allRegisteredOwners;
    
    for(User user in playersOrOwners){

      // Deal with user's alcoholics.
      for(User alcoholic in user.alcoholics){
        bool haveConversation = random.nextBool();

        if(user.cellNumber != alcoholic.cellNumber 
        && !haveTalked(user, alcoholic) && haveConversation){
          
          int minMessageIndex, maxMessageIndex;
          Message message;

          int numberOfUser1Messages = random.nextInt(10);
          List<Message> user1Messages = [];
          int messageNumber;

          for(messageNumber = 1; messageNumber <=numberOfUser1Messages; messageNumber++){
            minMessageIndex = random.nextInt(document.length*.75 as int);
            maxMessageIndex = minMessageIndex + random.nextInt(100);

            
            message = Message(
              isRead: true,
              sender: user, 
              text: document.substring(minMessageIndex, maxMessageIndex), 
              sentTime: DateTime.now().subtract(Duration(seconds: random.nextInt(1000000000))),
            );
            user1Messages.add(message);
          }

          // Mark LastMessage As Unread/Read.
          user1Messages[user1Messages.length-1].isRead = random.nextBool();
          if(user1Messages[user1Messages.length-1].isRead){
            user1Messages[user1Messages.length-1].isLiked = random.nextBool();
          }

          int numberOfUser2Messages = numberOfUser1Messages;
          numberOfUser2Messages +=  (random.nextBool()?random.nextInt(5)*1:random.nextInt(5));
          List<Message> user2Messages = [];

          for(messageNumber = 1; messageNumber <=numberOfUser2Messages; messageNumber++){
            minMessageIndex = random.nextInt(document.length*.75 as int);
            maxMessageIndex = minMessageIndex + random.nextInt(100);
            message = Message(
              isRead: true,
              sender: alcoholic, 
              text: document.substring(minMessageIndex, maxMessageIndex), 
              sentTime: DateTime.now().subtract(Duration(seconds: random.nextInt(1000000000))),
            );
            user2Messages.add(message);
          }

          // Mark LastMessage As Unread/Read.
          user2Messages[user2Messages.length-1].isRead = random.nextBool();
          if(user2Messages[user2Messages.length-1].isRead){
            user2Messages[user2Messages.length-1].isLiked = random.nextBool();
          }

          user.conversations.add(Conversation(
            user1: user,
            user2: alcoholic,
            user1Messages: user1Messages,
            user2Messages: user2Messages,
          ));
          alcoholic.conversations.add(Conversation(
            user1: alcoholic,
            user2: user,
            user1Messages: user2Messages,
            user2Messages: user1Messages,
          ));
        }
        
      }

      // Deal with owners who's store has this user as a member.
      for(Owner onwer in user.owners){
        
        bool haveConversation = random.nextBool();

        if(user.cellNumber != onwer.cellNumber 
        && !haveTalked(user, onwer) && haveConversation){
          
          int minMessageIndex, maxMessageIndex;
          Message message;

          int numberOfUser1Messages = random.nextInt(10);
          List<Message> user1Messages = [];
          int messageNumber;

          for(messageNumber = 1; messageNumber <=numberOfUser1Messages; messageNumber++){
            minMessageIndex = random.nextInt(document.length*.75 as int);
            maxMessageIndex = minMessageIndex + random.nextInt(100);

            
            message = Message(
              isRead: true,
              sender: user, 
              text: document.substring(minMessageIndex, maxMessageIndex), 
              sentTime: DateTime.now().subtract(Duration(seconds: random.nextInt(1000000000))),
            );
            user1Messages.add(message);
          }

          // Mark LastMessage As Unread/Read.
          user1Messages[user1Messages.length-1].isRead = random.nextBool();
          if(user1Messages[user1Messages.length-1].isRead){
            user1Messages[user1Messages.length-1].isLiked = random.nextBool();
          }

          int numberOfUser2Messages = numberOfUser1Messages;
          numberOfUser2Messages +=  (random.nextBool()?random.nextInt(5)*1:random.nextInt(5));
          List<Message> user2Messages = [];

          for(messageNumber = 1; messageNumber <=numberOfUser2Messages; messageNumber++){
            minMessageIndex = random.nextInt(document.length*.75 as int);
            maxMessageIndex = minMessageIndex + random.nextInt(100);
            message = Message(
              isRead: true,
              sender: onwer, 
              text: document.substring(minMessageIndex, maxMessageIndex), 
              sentTime: DateTime.now().subtract(Duration(seconds: random.nextInt(1000000000))),
            );
            user2Messages.add(message);
          }

          // Mark LastMessage As Unread/Read.
          user2Messages[user2Messages.length-1].isRead = random.nextBool();
          if(user2Messages[user2Messages.length-1].isRead){
            user2Messages[user2Messages.length-1].isLiked = random.nextBool();
          }

          user.conversations.add(Conversation(
            user1: user,
            user2: onwer,
            user1Messages: user1Messages,
            user2Messages: user2Messages,
          ));
          onwer.conversations.add(Conversation(
            user1: onwer,
            user2: user,
            user1Messages: user2Messages,
            user2Messages: user1Messages,
          ));
        }
      }
    }
  }

  String random3Letters(){
    String letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    String username = '';
    Random random = Random();
    username += letters[random.nextInt(letters.length)];
    username += letters[random.nextInt(letters.length)];
    username += letters[random.nextInt(letters.length)];

    return username;
  }
 
  User? findUser(String cellNumber){

    for(Player player in allRegisteredPlayers){
      if(player.cellNumber==cellNumber){
        return player;
      }
    }

    for(Owner owner in allRegisteredOwners){
      if(owner.cellNumber==cellNumber){
        return owner;
      }
    }

    return null;
  }

  void leaveStore(String joinedMemberId, String userCellNumber){
    
  }

  void joinStore(String joinedMemberId, String userCellNumber){
    
  }

  //================================Test 1 //================================
  // Alcohol Name Searching.
  Map<Store, List<int>> findStoresWithAlcohol(String alcoholName){
    Map<Store, List<int>> storesWithAlcoholIndices = {};
    List<Alcohol> alcohol;

    for(Store store in allRegisteredStores){
      alcohol = store.availableAlcohol;
      List<int> alcoholIndices = [];
      for(int i = 0; i < alcohol.length;i++){
        if(alcohol[i].fullname.contains(alcoholName)){
          alcoholIndices.add(i);
        }
      }

      if(alcoholIndices.isNotEmpty){
        storesWithAlcoholIndices.addAll({store:alcoholIndices});
      }
    }
    return storesWithAlcoholIndices;
  }
  
  List<Store> findStoreWithAlcohol(String alcoholName, 
  ut.AlcoholSearchedBy searchedBy,DateTime after, String? cellNumber){

    List<Store> stores = findStoresWithAlcohol(alcoholName).keys as List<Store>;
    List<Store> storesList = [];

    for(Store store in stores){
      for(Competition competition in store.competitions){
        if(competition.dateTime.isAfter(after)){
          storesList.add(store);
        }
      }
    }

    switch(searchedBy){
      case ut.AlcoholSearchedBy.dates: 
        storesList.sort(
          ((a, b) => a.findNextCloseCompetition(after)!
          .compareTo(b.findNextCloseCompetition(after)!))
        );
      break;
      case ut.AlcoholSearchedBy.nearest: 
        if(cellNumber != null){
          User? user = findUser(cellNumber);
          if(user != null){
            storesList.sort(((a, b)  =>
              LocationsGraph.findShortestDistanceBetweenSections(Location(sectionName:a.sectionName),Location(sectionName:user.sectionName))
              .compareTo(LocationsGraph.findShortestDistanceBetweenSections(Location(sectionName:b.sectionName),Location(sectionName:user.sectionName)))
            ));
          }
        }
      break;
      case ut.AlcoholSearchedBy.price:
        storesList.sort(
          ((a, b) { 
            Competition? firstCompetition = a.findNextCloseCompetition(after);
            double grandPriceMaxAmount1 = -1;
            for(GrandPrice grandPrice in firstCompetition!.grandPrices){
              double grandPriceAmount = grandPrice.findApproximatePrice();
              if(grandPrice.contains(alcoholName) &&
              grandPriceAmount>grandPriceMaxAmount1){
                grandPriceMaxAmount1 = grandPriceAmount;
              }
            }

            Competition? secondCompetition = b.findNextCloseCompetition(after);
            double grandPriceMaxAmount2 = -1;
            for(GrandPrice grandPrice in secondCompetition!.grandPrices){
              double grandPriceAmount = grandPrice.findApproximatePrice();
              if(grandPrice.contains(alcoholName) &&
              grandPriceAmount>grandPriceMaxAmount2){
                grandPriceMaxAmount2 = grandPriceAmount;
              }
            }

            return grandPriceMaxAmount2.compareTo(grandPriceMaxAmount2);
          }
        ));
    }

    return storesList;
  }
  //================================Test 2 //================================
  // Store Name Searching.
  List<Store> findStoresMatchingAName(String storeName){

    List<Store> stores = [];
    for(Store store in allRegisteredStores){
      if(store.storeName.contains(storeName)){
        stores.add(store);
      }
    }

    return stores;
  }
  
  Store? findStoreByName(String storeName){

    for(Store store in findStoresMatchingAName(storeName)){
      if(store.storeName==storeName){
        return store;
      }
    }
    return null;
  }
  
  bool storeExist(String storeName){
    return findStoreByName(storeName) != null;
  }
  //================================Test 3 //================================
  // Suburb Name Searching.
  List<Store> findStoresMatchingASuburb(String suburb){
    List<Store> stores = [];

    for(Store store in allRegisteredStores){
      if(gut.Utilities.asString(store.sectionName).contains(suburb) ||
      store.address.contains(suburb)){
        stores.add(store);
      }
    }

    return stores;
  }

  List<String> findStoresMatchingSuburb(String suburb){
    List<String> stores = [];

    for(Store store in findStoresMatchingASuburb(suburb)){
      stores.add(store.storeName);
    }
    return stores;
  }

  //================================Test 4 //================================
  // All members who are eligible to join a competition hosted by the owner of a specified cell number.
  Map<User, String> joinedMembers(String storeId){
    
    for(Store store in allRegisteredStores){
      if(store.storeId==storeId){
        return store.joinedMembers;
      }
    }
    return {}; // No owner with such a cell number.
  }

  //================================Test 5 //================================
  // All drinks available on a particular store which is owned by the someone having the specified number.
  List<Alcohol> findStoreAlcohol(String storeId){
    for(Store store in allRegisteredStores){
      if(store.storeId==storeId){
        return store.availableAlcohol;
      }
    }
    return []; // No owner with such a cell number.
  }

  //================================Test 6 //================================
  List<Post> findStorePosts(String storeId){
    for(Store store in allRegisteredStores){
      if(store.storeId==storeId){
        return  store.posts;
        
      }

    }
    return []; // Such store doesn't exist.
  }

  //================================Test 7 //================================
  List<Comment> findPostComments(String postId){

    for(Store store in allRegisteredStores){
      for(Post post in store.posts){
        if(post.postId==postId){
          return post.comments;
        }
      }
    }
    return [];
  }

  //================================Test 8================================
  // Recent Winners Display.
  List<WonPrice> findRecentWonPrices(ut.WonPricesOrder order, SectionName? sectionName){

    List<WonPrice> wonPricesList = [];

    for(WonPrice wonPrice in allRegisteredWonPrices){
      wonPricesList.add(wonPrice);
    }

    if(order==ut.WonPricesOrder.price){
      wonPricesList.sort((a, b) =>a.grandPrice.compareTo(b.grandPrice));
    }
    else{
      
      Set<SectionName> sectionNames = LocationsGraph.orderSections(sectionName!);

      List<WonPrice> list = [];

      for(SectionName sectionName in sectionNames){
        for(WonPrice wonPrice in wonPricesList){
          if(wonPrice.store.sectionName==sectionName){
            list.add(wonPrice);
          }
        }
      }

      wonPricesList = list;

    }

    return wonPricesList;
  }

  //================================Test 9 //================================
  // All registered stores.
  List<Store> findAllStores(){
    List<Store> stores =[];
    for(Store store in allRegisteredStores){
      stores.add(store);
    }
    return stores;
  }

  //================================Test 9 //================================
  // All competitions of a given store.
  List<Competition> findStoresCompetitions(String storeId){

    for(Store store in allRegisteredStores){
      if(store.storeId==storeId){
        return store.competitions;
      }
    }

    return []; // Such store doesn't exist.
  }

  //================================Test 10 //================================
  // Search and find alcohol by name and type.
  List<Alcohol> findAlcoholByNameAndType(String name, ut.AlcoholType type){
    List<Alcohol> alcoholList = [];
    for(Alcohol alcohol in findAlcoholByType(type)){
      if(alcohol.fullname.contains(name)){
        alcoholList.add(alcohol);
      }
    }
    return alcoholList;
  }
  
  //================================Test 11 //================================
  // Search and find alcohol by type.
  List<Alcohol> findAlcoholByType(ut.AlcoholType type){
    List<Alcohol> alcoholList = [];
    for(Alcohol alcohol in allRegisteredAlcohol){
      if(alcohol.alcoholType==type){
        alcoholList.add(alcohol);
      }
    }
    return alcoholList;
  }

  //================================Test 12 //================================
  // Retrieve a conversation between two people.
  Conversation? findConversation(String user1CellNo, String user2CellNo){

    User? user1 = findUser(user1CellNo);
    User? user2 = findUser(user1CellNo);

    if(user1==null || user2==null){ return null;}

    for(Conversation conversation in user1.conversations){
      if(conversation.user2.cellNumber==user2CellNo){
        return conversation;
      }
    }

    return null;

  }

  //================================Test 13 //================================
  // Retrieve owner's store.
  Store? findStore(String ownerCellNumber){
    for(Owner owner in allRegisteredOwners){
      if(owner.cellNumber==ownerCellNumber){
        return owner.store;
      }
    }

    return null;
  }

  // Retrieve store.
  Store? findStoreById(String storeId){
    for(Store store in allRegisteredStores){
      if(store.storeId==storeId){
        return store;
      }
    }

    return null;
  }


  //================================Test 14 //================================
  // Retrieve accepted beg requests.
  List<BegRequest> retrieveAcceptedBegRequests(String winnerNumber){

    List<BegRequest> acceptedRequests = [];
    for(BegRequest begRequest in findUser(winnerNumber)!.begRequests){
      if(begRequest.isAccepted!){
        acceptedRequests.add(begRequest);
      }
    }
    return acceptedRequests;
  }
  
  //================================Test 15 //================================
  // Retrieve rejected beg requests.
  List<BegRequest> retrieveRejectedBegRequests(String winnerNumber){

    List<BegRequest> rejectedRequests = [];
    for(BegRequest begRequest in findUser(winnerNumber)!.begRequests){
      if(begRequest.isAccepted! == false){
        rejectedRequests.add(begRequest);
      }
    }
    return rejectedRequests;
  }

  //================================Test 16 //================================
  // Retrieve rejected beg requests.
  List<BegRequest> retrieveIgnoredBegRequests(String winnerNumber){

    List<BegRequest> ignoredRequests = [];
    for(BegRequest begRequest in findUser(winnerNumber)!.begRequests){
      if(begRequest.isAccepted == null){
        ignoredRequests.add(begRequest);
      }
    }
    return ignoredRequests;
  }
  
  //================================Test 17 //================================
  void addBegger(String cellNumber, BegRequest begRequest){
    findUser(cellNumber)!.begRequests.add(begRequest);
  }
  //================================Test 18 //================================
  // Retrieve A Grand Price From A Database.
  GrandPrice? readGrandPrice(String competitionId, String grandPriceId){

    for(Competition competition in allRegisteredCompetitions){
      if(competition.competitionId==competitionId){
        for(GrandPrice grandPrice in competition.grandPrices){
          if(grandPrice.grandPriceId==grandPriceId){
            return grandPrice;
          }
        }
      }
    }
    return null;
  }

  void updateGrandPriceIsPointed(String competitionId, String grandPriceId){
    GrandPrice? grandPrice = readGrandPrice(competitionId, grandPriceId);
    grandPrice!.isPointed != grandPrice.isPointed;
    
  }

  //================================Test 19 //================================
  //================================Test 20 //================================
  //================================Test 21 //================================


  static const String document = 
  """
  Story 1 - Two girls come into my place Girl A has a problem, 
  Girl B is here to help. Firstly I boil water, while waiting 
  for it to boil Girl A is busy playing around with it(e.g. 
  putting water in and out of the bucket using a jar). Meanwhile 
  Girl B is going through the climax process(foot spanking, ass 
  spanking, body massage, dominance, etc). When the water is boiling 
  Girl B gives Girl A  hanging pex, thereafter Girl A will steam with 
  these hanging pex on her niples, that is when I will start 
  fingering Girl B. When Girl A is done steaming, she will go through 
  the process Girl B went through, however Girl B will be helping out 
  by playing with Girl A's clit until she comes at which point I will 
  start penetrating Girl A . That is pretty much it.

  # You only gonna be strong as the weakest person next to you. Betrayal is not as far away as you would like to believe By 50 Cent
# Evolve or die, If I have been unwilling or unable to evolve as an individual I would be in jail or dead by now.
# If I let myself care, all I feel is pain.
# My passion is equal to the task.
# I don't drink, I don't smoke, I don't date, I persue the unknown.
# as a matter of survival i make it a point to only enter spaces who's borders i define.
# it doesn't matter how smart you are in the world of stupid mother fuckers, they will shoot/step at you over some pirty shit.
# An educated person is not neccessarily one who has an aboundance of general specialized knowledge, An educated person is one who has so developed the facalties of their mind that they may acqiure anything that they want or it equivalent without violating the rights of others, An educated person is the one that knows how to go and get what they want out of life.
-------------------------------------------------------------------------Next--------------------------------------------------------------------
* Imnandi Impela Lendlela Engiyihambayo Inkingayayo Inomuzwa Ongapheli, Wenhliziyo Echaza Ihlabelela .
# We Code Non Stop, 24/7, 365, Every Decade, Every God Damn Century.
-------------------------------------------------------------------------One----------------------------------------------------------------- Aug - Sep 2019


* Fight for what you want now, or fight for what you don't want later, you choose. {}
* Greatness is a craft, greatness is a process, greatness is a habit, greatness is a little things that you do every day over time. 
Going out everyday unaffraid of whether or not this is one of the ten thousand tarrible things that you gonna do, 
it's bieng unaffraid to make those mistakes, it's bieng unaffraid that you not yet great.

* The level of  battle you face is an indication of the level of blessings that you stand to recieve.

* No one attempts the impossible without belief in something greater than themselves.
* It doesn't matter how slow you go, as long as you do not stop.{}
* We are the product of our mistakes.


* Remember this, only as high as you rich can you grow, only as far as you seek 
can you go, only as deep as you can look can you see,and only as much as you 
can dream can you be.

* To go against the dominant thinking of your family, friends, and those 
people you associate with everyday, is perhaps the most difficult active 
carrage you will ever perform.

* When writting a story of your life, don't let anyone hold the pen. Once you do, 
that's when you die before you ever had a chance to live.

* You want the secret? It's called work, do not get confused here. You have to 
work to match the ambition coming out of your mouth.

*Figure out who you are, don't apologize for who you are, and then become 
even greater than you naturally are, at what you are.

* It easy to move quikly when you don't care about the quality control. {}
* Follow you heart your body will catch up.
* If i have learnt anything in life, it that anything is possible.

* The whole game is broken, because everybody is too tied up into other people's 
opinions. I only care about my opinion of myself,and i care about what my family, 
friends, partner and the world think. Just not as much as i care about the way i think 
about myself.

* First step before you engage yourself on things that your heart love the most,
you gotta identify your gift. Because your gift will find a room for you.

* Defining ourself by what we are not, is the first step that leed us to knowing who we really are.

* You wanna have joy in your life? Good, now you got to start eliminating the who's, the where's, 
the when's, the what's and how's that will keep you from your identity.

* Nobody is gonna hit as hard as life. But it ain't about how hard you hit, it about how hard you
can get hit and keep moving forward, how much you can take and keep moving forward. 
Now if you know what you worth, now go out and get what you are worth, but you gotta be 
willing to take the hits.

* If you don't disciple your emotions they will use you.
* There is no price too great for me, there is no amount that i am not willing to go,
 i would die for my dreams.
* Small and steady wins the race.
* Small daily improvements over time will lead you to stunning result.
* .Working hard is the cost of entry to anything.
* See it, believe it, and then do it.
* Fear is a lair its activate the enemy.
* With little desciple you do little things, with alot of desciple you do alot of things.
* Life is a journey of discovering who i am and i know that greed, 
emotion, and fatige will demage my judgement in that journey, and what will enhence it
is keeping an open mind and seeking the councel of others.

* Pain of discipline or pain of regret, which one you choose?
* Make sure you have the best defence against the future.
* In competition, individual ambition serves the common goal.
* My first grade teacher said i was born with two helpings of brain but only half a helping of heart.
* By the age of 35, i want to look back and say i did well, before i retire.

* Take ownership, take extreme ownership. Don't make excuses, don't blame any other person or any other thing. 
Get control of your ego. Take ownership of everything in your world, the good and the bad. Take ownership of 
your mistakes, take ownership of your short falls, take ownership of your problems and then take ownership of the 
solutions that will get those problem solved. Take ownership of your job, team,mission, future...And lead to victory.

*. There are many ways to get the things that we want for our selves in our lifes, 
but basically it all begins with how we choose to think.
* Being a good listener and being able to connect with people are the keys to leadership.
* I know it sound selfish if you say it hashly, it's not my mother's life, it's not my father's life, 
 nor is it my partner's life, it's my life, so i'l follow my inner voice, not their opinion regarding 
my future.

* I found my fighting style, tai chi.
 * Success comes when there is no longer an option, no longer a choince. When it's do or die.

* Music gives me power and that makes me unstoppable.
* Darkness makes the legends that you see in the light.

* The first step that leads to our identity in life is usually not knowing who you are, 
it's actually knowing who you are not it called the process of elimination.
* Wise thinking leads to right living, stupid thinking leads to wrong living.

* Some guy was asked in a gym, how many sit ups you do? He said i don't start counting until it hurts.
That is working hard.

* You must be imaginitive, strong hearted, you must try things, they may not work. But you must not let anyone 
define your limits because of where you come from, your only limit is your soul.

* At the end of your feelings there is nothing, but at the end of every principle there is a promise.
*Don't ever give up, faith is a substance of things hoped for and the evidence of things not seen. It's real hard hoping.

* Disappoinment can be turn into drive or disappointment can distroy you.

* Funa into ethandwa yihliziyo yakho ezokwenzela imali kusenesikhathi. Mawuhlulekile, 
uzosebenza umsebenzi ongawuthandi, usebenzela abantu abayifuna bayithola kusenesikhathi.
abantu abayifuna bayithola.

* Learn how to love to lose.
* I'm invinsible
* I wanna build the biggest building in town, ever, by just building the biggest building in town, 
while I think most people try to tie down everybody else's building .

* Only a man who knows what it's like to be defeated, 
can reach down to the bottom of his soul and come up 
with the extra ounce of power it takes to win. When the match even.
* A winner is a looser who tried one more time.

* If you not willing to risk you cannot grow, and if you cannot grow you 
cannot become your best, and if you cannot become your best you cannot 
be happy, and if you cannot be happy what else is there?

* It's better to be prepared for an opportunity and not have one, then to have an opportunity and not be prepared.
* By not pursuing your goal, deciding to go to a job that you don't like, you are literally commiting spiritual suicide.

* Creativity, Decisivness, Passion, Honesty, Love, Sincerity, these are the ultamate human resources. 
When you engage these resources, you can get any other resource on earth.

* Look at a man the way that he is he only becomes worse, 
but look at him as if he were what he could be than he becomes what he should be.

*You are more than your RESULTS to this point in your life.
* Don't complain or explain
* Everyone you meet is fighting a battle you know nothing about.

* Ukuthi ngangifuna ukuzazi kuqala ukuthi empilweni ngingubani, ngibhekephi, ngayiphi inhloso,
kuyima ngibaqambela amanga ngokuzethemba ngoba bayawathanda. Ngangeke ngizenze isilima 
ngibaqambele amanga athandekayo ngazi kahle ukuthi angizithandi ngenxa yokuthi angazi ukuthi
empilweni ngingubani, ngibhekephi, ngayiphi inhloso.

* I am more than this, I haven't got more because i wasn't hungry enough. Now i am hungry enough, I am more than 
hungry, I'm starving. Now...I must, Now...I will. Nothing will stop me, Because i will no longer stop myself. I am more 
than this...

* Keep away from those who try to belittle your ambitions. Small people always do that, but the really great ones,
they make you believe that you too can become great. That's the king of people you wanna surround yourself with.

* With every great thing in life there is gonna be sacrifice, with every great thing in life there is gonna be work, and with 
every great thing in life there is gonna be time. You're gonna have to make difficult decisions, you're gonna have to put in 
the work, and you're gonna have to be patient. But if you can combine those three things, that what makes great things 
happen, that what builds epic lives and builds ultimate realizations of potential.

*.The people that you see that win at a highest level they are the ones that didn't give up, they are survivors. And you gotta ask your self. 
I am a survivor type? Am I a type of person that continues to push throught when it gets hard, when its get boring,when i feel loss, when i 
don't know what i am doing, when i have no faith in myself? Even in that darkest hour, can i push forward? Can i accept that the human 
body will respond to that stress?

* The world ain't all sunshine and rainbows, it's a very mean and nasty place, and i don't care
how tough you are, it will beat you to your knees and keep you there permanently if you let it.

*You shouldn't need a calender to switch to another number for you to get motivated. If you are waiting for that to better yourself, 
if you are waiting for that to inspire, to be passionate, to grow, then you are setting yourself up for absolute failure.
* How bad do you want your dream?
* The wiser you get, the less you speak. 
* My teacher said, when you change, everything will change.
* For things to change, you have got to change.
* When you get better, things will get better for you.
* If you know the why for living, you can endure almost any how.
* I just live by the ABC's Advernturious, Brave, Creative
* Thoughts are powerful, thoughts lead to actions, actions over time become habits, and habits lead to long lasting results.
* You might be smarter than me, you might be sweeter than me, you might have money, but you will never outwork me.

* People are loyal until they find an oppotunity not to.
* I'm not the rechest, smartest or most talented person in the world, but i succeed because i keep going and going and going...
And that's the secret. By Sylvester Stallon
* It is much easier to have self disciple if you have clear goals and meaningful purpose, something that is much more important
than meaningless distructions.

* Success consists of going from failure to failure without loss of enthusiasm.
* The day you were born isn't as important as the day you know why you were born.
* Not taking risks is risky.
* Complaints solve no problem. %
* The first assignment of any human being is to know why he was born.
* Good decisions come from experience, and experience come from bad decisions.

* Everyday we are either repairing or preparing. We repair when we fail to manage the decisions that we have made.
We prepare when we are on the daily basis managing the decisions we have made. So your footprints to success are
really footprints of success. /**used**/
* Effort makes a difference. /**used**/
* Love your yourself enought to be honest with yourself. Don't lie to yourself. /**used**/

* The more you know the more you realize you don't know. The more you don't know the more you think you know. /**used**/
* Your heart, your life, your happiness is your responsibility, your respoonsibility alone. /**used**/
* The defination of who i am is very clear to me, and it also redefines who i wanna be. /**used**/
* Love your family, choose your friends. /**used**/

* Why you wanna be a leader? Because leadership isn't easy, leadership a lot of times isn't fun, 
leadership a lot of times is kinda lonely. There is only one reason to be a leader. And that is to 
add value to people. And you and i we can only add value to people if we truly value them.

* I don't take shortcuts, I take smartcuts. %
* Doubt kills more dreams than failure ever will. /**used**/
* I was born ready to win against life. /**used**/
* Isitha Sami Sisodwa vo, igama laso ubuthongo.
*The rewards in life don't always go to the biggest, or the bravest, or the cleverest. The rewards in life go to the dagged, 
to the determined, to the tenacious. Those who get back on their feet when they are kicked, and they get up again, and again.
* The rewards go to those who understand what it means to never give up. /**used**/
* Ferrari doesn't advertise on TV because their customers don't watch much of it. /**used**/
* Done is better than profit. /**used**/

* I used to wonder why birds stay is the same place when they can fly anywhere on earth. The answer is simple, the secret 
of getting ahead is getting started. And that why people stack, you are literally like a bird, you could go anywhere you want.
And that is the simple truth everything else is bullshits, everything else is the weak voice in your mind holding you back 
making you a less version of yourself. So, i ask you. Why doesn't the bird flies where ever it wants to go?
* I feel like i'm dancing with the stars.
* The future rewards those who press on, with patience, firm and determination. I am gonna press on. 
I don't have time to feel sorry for myself, i don't have time to complain, I'm gonna press on. 
Stop complaining, stop crying, you have to press on, you have work to do, now press on.
* I am importent to the universe.  /**used**/
* I live and work by a very strict code, built on loyalty, justice, trust...I survive because i eliminate those who betray it.  /**used**/
* See with your eyes you will see things, see with your mind you will see answers.  /**used**/
* Make good decisions and then you going to have less to complain about is a general matter.  /**used**/

* You not gonna separate yourself based on your genetics, you not gonna separate yourself based on who your parents were, 
where you were born, what you have been throught, you gonna separate yourself by showing up when you don't want to, 
you gonna separate yourself by pushing forward when it hurts, you gonna separate yourself by always moving forward, 
even when the forward is falling on your face. So never lose sight of that, it's the person that keeps going that can't be defeated.
<<<<<<<<<<<<<<<<<<<<<You are the way you see yourself and deep inside you, is a person no one knows yet.>>>>>>>>>>>>>>>>>>>>

*Travel the high road, there are three roads to travel, the low road, that's where we treat people worst than they treat us, the middle road is where we treat people the same as they treat us, and lastly the high road, where we treat people better than they treat us.

* Not everything that counts can be counted, and not everything that is counted truly counts. /**used**/
* I've found out it's easier to talk than it is to listen. /**used**/
* Emotions are the enemy of facts. /**used**/
* Whatever your mind can conceive and believe your mind can achieve. Note it says nothing about the need of education. /**used**/
* Act as if what you do matters, coz it does. /**used**/
* Lets think of something that might happen if you do what you have been wanting to do for years.Ok well, it might not work the first time, it might not be as easy 
as you thought, people might lough at youand talk about you behing your back, you might get hurt. But if you keep taking action inspite of all this staff 
that might happen guess what, sooner or later you gonna start winning. Remember there is no such thing as failuire baby, only feed back.Now let talk about what 
will happen if you don't act, well, you will keep getting the same results you getting now, you will be treatedthe same as you are right now, you will keep making 
the same money, you will keep on doing things you don't wanna be doing, and worstof all, you will get to the end of your life and regret that you didn't try.
--------------------------------------------------------------------------My quotes-----------------------------------------------------------------------------
* Listen with a women's ears, process with a man's heart, then act with a clear head. /**used**/
* If only you can be as consistent as day and night, it a matter of time before you make it to the next level. /**used**/
* My breath implies progress
 

  """;
}