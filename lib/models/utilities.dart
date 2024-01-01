import 'package:flutter/material.dart';

import '../main.dart';
import 'old_post.dart';
import 'old_store.dart';

enum SearchCategory{
  searchByAlcohol,
  searchByStore,
  searchBySuburb,
}

enum AlcoholSearchedBy{
  nearest,
  price,
  dates,
}

enum WonPricesOrder{
  location,
  price,
}

enum ToPage{
  chatsWidget,
  winnerScreen,
  postsWidget,
}

enum AlcoholType{
  beer,
  cider,
  wine,
  vodka,
}

enum FoundStoreType{
  storeWithCompetitionToCome,
  storeWithNoCompetitionToCome,
  storeWithWinner,
}

enum StoreJoinStatus{
  approved,
  alreadyJoined,
  needToLoginOrRegister,
}

class Utilities{

  // -----------Below : Action Buttions Style And Decoration.-----------
  static TextStyle actionButtonStyle = const TextStyle(
  fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white);
  static BoxDecoration actionButtonDecoration = const BoxDecoration(
  color: Color.fromARGB(255, 44, 35, 46),
  borderRadius: BorderRadius.all(Radius.circular(30)), 
  );
  // -----------Above : Action Buttions Style And Decoration.-----------

// Post Dialog Box.
  static void displayPostDialog(BuildContext context, Store store) async {
    
    TextEditingController controller = TextEditingController();
    
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return Expanded(
          child: AlertDialog(
            title: const Center(child: Text('Create A Post')),
            content: Container(
              height: 100,
              width: double.infinity,
              color: Colors.orange,
              child:TextField(
                controller: controller,
                autofocus: true,
                maxLines: null,
                showCursor: true,
                onSubmitted: (value) {
                  if(controller.text.isNotEmpty){
                    Post post = Post(
                      owner: MyApplication.currentUser!, 
                      text: controller.text
                    );

                    store.posts.add(post);
                    
                    
                  }
                },
              ),
            ),
            backgroundColor: Colors.blue,
            titleTextStyle: const TextStyle(
              color:Colors.red, 
              fontSize: 20, 
              fontWeight: FontWeight.bold,
            ),
            contentTextStyle: const TextStyle(
              color:Colors.white, 
              fontSize: 14, 
              fontWeight: FontWeight.bold,
            ),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: const Text('Post', style: TextStyle(color: Colors.white),),
              ),
            ],
          ),
        );
      },
    );
  }

  // Create Post Text Field
  static Container postTextField(BuildContext context, Function onTap, bool? isKnown)=>Container(
    height: 100,
    width: double.infinity,
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(10),
    ),
                      
    child: TextField(
      readOnly: isKnown!=null && isKnown==false, 
      decoration: const InputDecoration(
        hintText: 'Create Post On This Store',
        hintStyle: TextStyle(
          fontSize: 14,
        ),
      ),
      onTap: () => onTap
    ),
  );
}