import 'package:flutter/material.dart';
import 'models/samples_for_testing.dart';
import 'models/old_user.dart';
import 'screens/start_screen.dart';

void main() {
  runApp(const MyApplication());

}

class MyApplication extends StatefulWidget {
  
  const MyApplication({super.key});

  static String title = 'Alcoholic';
  static SampleForTesting sampleForTesting = SampleForTesting();

  static LinearGradient appBarlinearGradient = const LinearGradient(
  colors: [Colors.red, Colors.purple],
  begin: Alignment.bottomLeft,end: Alignment.topRight,);

  static LinearGradient priceslinearGradient = const LinearGradient(
  colors: [Colors.white, Color.fromARGB(255, 44, 35, 46)],
  begin: Alignment.bottomLeft,end: Alignment.topRight,);

  static Color textColor = const Color.fromARGB(255, 154, 46, 173);
  static double infoTextFontSize = 15;

  static String userPhoneNumber = '';

  static User? currentUser;

  static BoxDecoration userThoughtsAreaDecoration = const BoxDecoration(
  color: Color.fromARGB(255, 190, 183, 209),borderRadius: 
  BorderRadius.only(topLeft: Radius.circular(30),topRight: 
  Radius.circular(30),));

  static BoxDecoration userThoughtsDecoration = const BoxDecoration(
  color: Color.fromARGB(255, 182, 142, 189),borderRadius: 
  BorderRadius.only(bottomRight: Radius.circular(20),topRight: 
  Radius.circular(20),));

  static TextStyle usernameStyle = const TextStyle(
  color: Colors.grey, fontSize: 15,fontWeight: FontWeight.bold,);

  static TextStyle userMessageStyle = const TextStyle(
  color: Colors.blueGrey, fontSize: 15,fontWeight: FontWeight.w600,);



  @override
  State<MyApplication> createState() => _MyApplicationState();
}

class _MyApplicationState extends State<MyApplication> {

  @override
  void initState() {
    // This method execute only when this state is created for the first time.
    // It get executed befor the build method.
    super.initState();
  }

  @override
  Widget build(BuildContext context) {

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Alcoholic',
      theme: ThemeData(
        primaryColor: const Color.fromARGB(115, 65, 9, 39),
        secondaryHeaderColor: const Color.fromARGB(115, 231, 195, 214),
      ),
      home: StartScreen()
    );

    
    
  }
}
