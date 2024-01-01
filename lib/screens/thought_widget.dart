import 'package:flutter/material.dart';

import '../models/old_message.dart';

abstract class ThoughtWidget extends StatefulWidget{

  Message message;
  Color? color;

  ThoughtWidget({
    required this.message,
    this.color,
  });
}