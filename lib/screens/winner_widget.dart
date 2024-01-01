import 'package:flutter/material.dart';
import '../screens/store_info_widget.dart';
import '../models/old_beg_request.dart';
import '../main.dart';
import '../models/utilities.dart';
import '../models/old_owner.dart';
import '../models/old_player.dart';
import '../models/old_won_price.dart';
import 'entrance_widget.dart';
import 'page_navigation.dart';

class WinnerWidget extends StatefulWidget{

  final WonPrice wonPrice;
  final bool showStoreInfoFirst;

  const WinnerWidget({super.key, 
    required this.wonPrice,
    this.showStoreInfoFirst = false,
  });

  @override 
  WinnerWidgetState createState()=>WinnerWidgetState();
}

class WinnerWidgetState extends State<WinnerWidget>{

  bool isKnown = false;
  bool seeBeggers = false;

  List<BegRequest> acceptedBegRequests = [];
  List<BegRequest> rejectedBegRequests = [];
  List<BegRequest> ignoredBegRequests = [];

  void onKnownChanged(value){
    setState(() {
      if(value=='Yes'){
        isKnown = true;
      }
      else{
        isKnown = false;
      }
    });
  }

  void onSeeBeggersChanged(value){
    setState(() {
      if(value=='Yes'){
        seeBeggers = true;
        
        acceptedBegRequests = MyApplication.sampleForTesting.retrieveAcceptedBegRequests(widget.wonPrice.competition.winner!.cellNumber);
        rejectedBegRequests = MyApplication.sampleForTesting.retrieveRejectedBegRequests(widget.wonPrice.competition.winner!.cellNumber);
        ignoredBegRequests = MyApplication.sampleForTesting.retrieveIgnoredBegRequests(widget.wonPrice.competition.winner!.cellNumber);
      }
      else{
        seeBeggers = false;
      }
    });
  }

    _displayNotAllowedBeggerDialog(BuildContext context) async {
    
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return Expanded(
          child: AlertDialog(
            title: const Center(child: Text('Sorry')),
            content: Container(
              alignment: Alignment.center,
              height: 100,
              width: double.infinity,
              color: Colors.orange,
              child: const Text('Oops!!! Only Members Who Entered The Competition Are Allowed To Beg.',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
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
                child: const Text('Ok', style: TextStyle(color: Colors.white),),
              ),
            ],
          ),
        );
      },
    );
  }


  _displayAllowedBeggerDialog(BuildContext context) async {
    
    TextEditingController controller = TextEditingController();
    
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return Expanded(
          child: AlertDialog(
            title: const Center(child: Text('What Would You Like?')),
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
                    BegRequest begRequest = BegRequest(
                      description: controller.text, 
                      begger: MyApplication.currentUser!, 
                      wonPrice: widget.wonPrice,
                    );

                   
                    MyApplication.sampleForTesting.addBegger(
                    widget.wonPrice.competition.winner!.cellNumber, 
                    begRequest);
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
                child: const Text('Beg', style: TextStyle(color: Colors.white),),
              ),
            ],
          ),
        );
      },
    );
  }


  Widget findBegRequestResult(BegRequest begRequest){
    Color color;
    String result;

    if(begRequest.isAccepted!){
      result = 'Accepted';
      color = Colors.green;
    }
    else if(begRequest.isAccepted! == false){
      result = 'Rejected';
      color = Colors.red;
    }
    else{
      result = 'Ignored';
      color = Colors.grey;
    }

    return Container(
      width: 60,
      height: 20,
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(30),
      ),
      alignment: Alignment.center,
      child: Text(result,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 12,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget showBeggers(){
    if(seeBeggers){
      
      return Expanded(
        child: Container(
          decoration: MyApplication.userThoughtsAreaDecoration,
          child: ClipRRect(
            borderRadius: MyApplication.userThoughtsAreaDecoration.borderRadius,
            child: ListView.builder(
              itemCount: acceptedBegRequests.length+rejectedBegRequests.length+ignoredBegRequests.length,
              itemBuilder: ((context, index) {
                BegRequest begRequest;
                if(index<acceptedBegRequests.length){
                  begRequest = acceptedBegRequests[index];
                }
                else if(index<acceptedBegRequests.length+rejectedBegRequests.length){
                  begRequest = acceptedBegRequests[index-acceptedBegRequests.length];
                }
                else{
                  begRequest = acceptedBegRequests[index-acceptedBegRequests.length-rejectedBegRequests.length];
                }
          
                // You can use this container on PeopleYouKnowWidget, OnlinePeopleWidget, ...
                // However softwrap should be removes and overflow be added.
                return Container(
                  margin: const EdgeInsets.only(top: 5, bottom:5,right:20),
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                  decoration: MyApplication.userThoughtsDecoration,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          CircleAvatar(
                            radius: 35,
                            backgroundImage: NetworkImage(
                              begRequest.begger.isOnwer()?
                              (begRequest.begger as Owner).store.imageLocation:
                              (begRequest.begger as Player).picPath
                            ),
                          ),
                          const SizedBox(width:10),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(begRequest.begger.username,
                                style: MyApplication.usernameStyle
                              ),
                              const SizedBox(height:5),
                              Container(
                                width: MediaQuery.of(context).size.width/5,
                                child: Text(begRequest.description,
                                  style: MyApplication.userMessageStyle,
                                  softWrap: true,
                                  //overflow: TextOverflow.ellipsis,
                                ),
                              ),
                            ],
                          )
                        ],
                      ),
                      Column(
                        children: [
                          Text('$begRequest.dateCreated.hour:$begRequest.dateCreated.minute',
                            style: MyApplication.usernameStyle,
                          ),
                          const SizedBox(height: 5,),
                          findBegRequestResult(begRequest),
                        ],
                        )
                    ],
                  ),
                );
              })
            ),
          ),
        ),
      );
    }

    // No Beggers To Show.
    return const Text('');
  }

  // Ask If The Current User Knows The Winner.
  Row ask()=>Row(
    children: [
      Text('Do You Know ${widget.wonPrice.competition.winner!.isMale?'Him?':'Her?'}',
        style: TextStyle(fontSize: MyApplication.infoTextFontSize, fontWeight: FontWeight.bold),
      ),
      Row(
        children: [
          Radio(value: 'Yes', groupValue: 'Known', onChanged: ((value) => onKnownChanged(value))),
          Radio(autofocus: true, value: 'No', groupValue: 'Known', onChanged: ((value) => onKnownChanged(value))),
        ],
      ),
    ],
  );

  // The Image Of A Winner. 
  Center winnerImage()=>Center(
    child: CircleAvatar(
      radius: MediaQuery.of(context).size.width/4,
      backgroundColor: Colors.orange,
      backgroundImage: NetworkImage(
        widget.wonPrice.competition.winner!.findImageLocation(),
      ),
    ),
  );

  // Information About The Price Won.
  Column priceInfo()=>Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      // Winner's Information
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text('Winner Username',
            style: TextStyle(
              fontSize: MyApplication.infoTextFontSize,
            ),
          ),
          Text(widget.wonPrice.competition.winner!.username,
            style: TextStyle(
              fontSize: MyApplication.infoTextFontSize,
            ),
          ),
        ],
      ),
      // The Details Of What Is Won.
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text('Won Price',
            style: TextStyle(
              fontSize: MyApplication.infoTextFontSize,
            ),
          ),
          Text(widget.wonPrice.grandPrice.description,
            style: TextStyle(
              fontSize: MyApplication.infoTextFontSize,
            ),
          ),
        ],
      ),
      // The Winning Date.
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text('Winning Date',
            style: TextStyle(
              fontSize: MyApplication.infoTextFontSize,
            ),
          ),
          Text(widget.wonPrice.competition.dateTime.toString(),
            style: TextStyle(
              fontSize: MyApplication.infoTextFontSize,
            ),
          ),
        ],
      ),
    ],
  );

  // Dealing With Communications And Connections.
  Column communications()=>Column(
    children: [
      // The 'Beg Winner' Button, For Asking For Alcohol From The Winner.
      GestureDetector(
        onTap: (){
          // Only Allow Beggers Who Know This Winner.
          // Should That Be The Case, Add The Begger To Winner's List Of Beggers.
          if(isKnown && MyApplication.currentUser!=null){
            if(widget.wonPrice.competition.contains(MyApplication.currentUser!.cellNumber)){
              _displayAllowedBeggerDialog(context);
            }
            else{
              _displayNotAllowedBeggerDialog(context);
            }
          }
          // The User Must Login In Order To Beg.
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
                  body: const EntranceWidget(toPage: ToPage.winnerScreen,),
                ),
              ),
            );
          }
        },
        child: Container(
          alignment: Alignment.center,
          decoration: isKnown?Utilities.actionButtonDecoration:
          BoxDecoration(
            color:Colors.grey,
            borderRadius: Utilities.actionButtonDecoration.borderRadius,
          ),
          child: Text('Beg Winner',
            style: Utilities.actionButtonStyle,
          ),
        ),
      ),
      // Determinant Of Whether To Show Other Beggers.
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text('See Other Beggers?',
            style: TextStyle(
              fontSize: MyApplication.infoTextFontSize,
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Radio(value: 'Yes', groupValue: 'See Beggers', onChanged: ((value) => onSeeBeggersChanged(value))),
              Radio(autofocus: true, value: 'No', groupValue: 'See Beggers', onChanged: ((value) => onSeeBeggersChanged(value))),
            ],
          ),
        ],
      ),
      // Show All Beggers.
      showBeggers(),
    ],
  );
                 
  @override 
  Widget build(BuildContext context)=>Column(
      children: [
        // Scrollable Part For The Sake Of Viewing Beggings.
        SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            // The Order In Which Widgets Are Displayed May Differ.
            child: !widget.showStoreInfoFirst?Column(
              children: [ 
                // Ask If The Current User Knows The Winner.
                ask(),
                // The Image Of A Winner. 
                winnerImage(),
                const SizedBox(height: 8),
                // Information About The Price Won.
                priceInfo(),
                const SizedBox(height: 8),
                // Information About The Hosting Store.
                StoreInfoWidget(store: widget.wonPrice.store),
                // Dealing With Communications And Connections.
                communications()
              ],
            ):Column(
              children: [
                // Information About The Hosting Store.
                StoreInfoWidget(store: widget.wonPrice.store),
                // Ask If The Current User Knows The Winner.
                ask(),
                // The Image Of A Winner. 
                winnerImage(),
                const SizedBox(height: 8),
                // Information About The Price Won.
                priceInfo(),
                const SizedBox(height: 8),
                // Dealing With Communications And Connections.
                communications()
              ],
            ),
          ),
        ),
        // A space to create a post to the appropriate store.
        widget.showStoreInfoFirst?const SizedBox.shrink():
        Utilities.postTextField(context, onTap(context), isKnown),      
      ],
    );

    onTap(BuildContext context){
      // Create A Popup Winner For Creating A Post Only For Logged In Users.
      if(isKnown && MyApplication.currentUser!=null){
        Utilities.displayPostDialog(context, widget.wonPrice.store);
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
              body: const EntranceWidget(toPage: ToPage.winnerScreen,),
            ),
          ),
        );
      }          
    }
    
}