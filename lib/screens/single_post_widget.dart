import 'package:flutter/material.dart';
import '/main.dart';
import '/models/utilities.dart';
import '../screens/post_thought_widget.dart';
import '../models/old_comment.dart';
import '../models/old_message.dart';
import '../models/old_post.dart';
import 'entrance_widget.dart';
import 'page_navigation.dart';
import '../models/old_store.dart';
import 'store_name_search_widget.dart';

class SinglePostWidget extends StatefulWidget{

  final Store store;

  const SinglePostWidget({super.key, 
    required this.store,
  });

  @override 
  State<SinglePostWidget> createState()=> SinglePostWidgetState();
}

class SinglePostWidgetState extends State<SinglePostWidget>{

  TextEditingController controller = TextEditingController();

  String generateSentTime(DateTime time){
    int hour =time.hour;
    int minute = time.minute;
    
    return '$hour:$minute ${hour>=12?'PM':'AM'}';
  }

  @override 
  Widget build(BuildContext context)=>Column(
    children: [
      // Store Image, Store Name, Store Address And Current Store's Competiton State.
      StoreNameSearchWidget(storeName:widget.store.storeName, displayPostWidgets: false,),
      // Create Post Textfield.
      Utilities.postTextField(context, onTap(context), null),      
      // All The Post On This Store.
      Expanded(
        child: ListView.builder(
          itemCount: widget.store.posts.length,
          itemBuilder: ((context, index) {
            Post post = widget.store.posts[index];
            return Column(children: [
              // Post Owner Image, Post Message, Comment Button.
              Row(children: [
                CircleAvatar(
                  radius: 35,
                  backgroundImage: NetworkImage(post.owner.findImageLocation()),
                ),
                const SizedBox(width: 10,),
                // Post Message
                Container(
                  alignment: Alignment.centerLeft,
                  width: MediaQuery.of(context).size.width/0.3,
                  child: Text(post.text,
                    softWrap: true,
                    style: const TextStyle(
                      color: Colors.blueGrey,
                      fontSize: 25,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                // Comment Button
                GestureDetector(
                  onTap: (() {
                    
                  }),
                  child: Container(
                    width: 100,
                    height: 50,
                    alignment: Alignment.center,
                    padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                    margin: const EdgeInsets.only(left: 20, right: 20),
                    decoration: Utilities.actionButtonDecoration,
                    child: const Text('Comment',
                      style: TextStyle(
                        color: Colors.white, 
                        fontSize: 15, 
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                )
                ],
              ),
              // All The Comments Of The Post.
              Padding(
                padding: const EdgeInsets.only(left: 20),
                child: ListView.builder(
                  itemCount: post.comments.length,
                  itemBuilder: ((context, index) {
                    Comment comment = post.comments[index];
                    return PostThoughtWidget(
                      color: const Color.fromARGB(255, 225, 183, 233),
                      message: Message(
                        text: comment.text,
                        sentTime: comment.time!,
                        sender: comment.owner,
                      ),
                      isMember: MyApplication.currentUser!=null && 
                      widget.store.hasJoined(MyApplication.currentUser!.cellNumber),
                    );
                  })
                ),
              ),
            ],
          );
        })),
      ),
    ]
  );

  onTap(BuildContext context){
      // Create A Popup Winner For Creating A Post Only For Logged In Users.
      if(MyApplication.currentUser!=null){
        Utilities.displayPostDialog(context, widget.store);
      }
      // The User Must Login In Or Register Order To Post.
      else if(MyApplication.currentUser==null){
        Navigator.of(context).push(
          CustomPageRoute(
            child: Scaffold(
              appBar: AppBar(
                leading: IconButton(
                  onPressed: (() => Navigator.of(context).pop()), 
                  icon: const Icon(Icons.arrow_back),
                ),
              ),
              body: const EntranceWidget(toPage: ToPage.postsWidget,),
            ),
          ),
        );
      }          
    }
    
}