import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
// @ts-ignore
import Speech from 'speak-tts'
import { VoiceRecognitionService } from './service/voice-recognition.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  gameCompleted: boolean = false
  title = 'odd_even';
  all = [2, 4, 6, 11, 12, 21, 22];

  animalList = [2, 4, 6,]
  objectList = [11, 12,]
  sportsList = [21, 22]

  animals = [99]
  objects = [999]
  sports = [9999]
  categoryCount: number = 2 // TODO: make it in range of 2 to 6
  speech = new Speech()
  command!: string
  prevCommand!: string
  error!: string
  ranCount: number = 0
  item!: string
  itemCount: number = 0
  colNums: object[] = [
    { key: 1, value: 'animal' },
    { key: 2, value: 'objects' },
    { key: 3, value: 'sports' },
  ]
  constructor(
    private toastr: ToastrService,
    public voiceToSpeechService: VoiceRecognitionService
  ) { }

  ngOnInit() {
    this.startSpeech()
    // starting voice to text
    // this.speech.speak({ text: 'Select an item from items' })

    // if (!this.item) {

    //   if (!this.voiceToSpeechService.text && !this.item) {
    //     this.voiceToSpeechService.init()
    //     this.voiceToSpeechService.start()

    //     this.item = this.voiceToSpeechService.text
    //     console.log('item ', this.item)
    //   } else {
    //     this.item = this.voiceToSpeechService.text
    //   }

    //   this.itemCount = 0
    //   if (this.item.endsWith('.')) {
    //     this.item = this.item.slice(0, this.item.length - 1)
    //   }
    //   switch (this.item.toLowerCase()) {
    //     case 'dog':
    //       this.itemCount = 2
    //       break;
    //     case 'cat':
    //       this.itemCount = 4
    //       break;
    //     case 'dove':
    //       this.itemCount = 6
    //       break;
    //     case 'table':
    //       this.itemCount = 11
    //       break;
    //     case 'chair':
    //       this.itemCount = 12
    //       break;
    //     case 'ball':
    //       this.itemCount = 21
    //       break;

    //     default:
    //       break;
    //   }

    //   if (this.all.includes(this.itemCount)) {
    //     // stop speech recog
    //     console.log(this.itemCount)
    //     this.voiceToSpeechService.stop()
    //     console.log(`${this.item} selected`)
    //     this.speech.speak({ text: `${this.item} selected` })
    //     this.moveItem()
    //     console.log(this.itemCount)
    //   }
    // }, 1000)
    // }

    this.selectItem();
  }

  selectItem() {
    // this.speech.speak({ text: 'Select an item from items' })
    this.voiceToSpeechService.speak().subscribe(res => {
      this.voiceToSpeechService.init()
      this.voiceToSpeechService.start()
      // while (!this.item) {
      this.item = this.voiceToSpeechService.text
      console.log('item ', this.item)
      // }

    }, err => { console.log(err) })
    this.voiceToSpeechService.stop()
  }

  moveItem() {

    this.voiceToSpeechService.text = ''
    const colNum = parseInt(this.voiceToSpeechService.text)
    console.log(`Moving ${this.item} to ${this.colNums[colNum]}`)
    // switch () {
    //   case :

    //     break;

    //   default:
    //     break;
    // }

    // this.changeList()

    // nextArr: number[],
    // prevIndex: number = 3,
    // nextIndex: number = 1
  }

  startSpeech() {
    if (this.speech.hasBrowserSupport()) {
      console.log("speech synthesis supported")
    } else {
      console.log("speech synthesis not supported")
    }

    this.command = this.voiceToSpeechService.text
  }

  runCommand(objectName: string, next: any) {
    let prevIndex = -1;
    let nextArr = this.animalList;
    let run = false
    if (objectName == 'dog') {
      prevIndex = 0 - this.ranCount
      run = true
    } else if (objectName == 'cat') {
      prevIndex = 1 - this.ranCount
      run = true
    } else if (objectName == 'dove') {
      prevIndex = 2 - this.ranCount
      run = true
    } else if (objectName == 'table') {
      run = true
      prevIndex = 3 - this.ranCount
    } else if (objectName == 'chair') {
      run = true
      prevIndex = 4 - this.ranCount
    } else if (objectName == 'ball') {
      run = true
      prevIndex = 5 - this.ranCount
    } else if (objectName == 'bat') {
      run = true
      prevIndex = 6 - this.ranCount
    }


    if (next == 'animals' || next == 'animal') {
      nextArr = this.animals
    } else if (next == 'objects' || next == 'object') {
      nextArr = this.objects
    } else if (next == 'sports' || next == 'sport') {
      nextArr = this.sports
    }

    if (prevIndex > -1 || run) {
      console.log(prevIndex)
      this.changeList(nextArr, prevIndex)
    } else {
      console.log('error ', prevIndex)
    }
    this.ranCount++
    this.prevCommand = this.command
  }

  changeList(
    // prevArr: number[] = this.all,
    nextArr: number[],
    prevIndex: number = 3,
    nextIndex: number = 1
  ) {
    transferArrayItem(
      this.all, // the main list
      nextArr, // the list u enter into
      prevIndex, // index in previous container used to select the item
      nextIndex, // index in new container just for location
    );
    // this.speech.speak({ text: 'Hello World' })
  }

  parse() {
    const cArr = this.command.split(' ')
    if (cArr[1] != 'to') {
      this.error = 'Wrong Command syntax: "dog to animal" or "chair to objects"'
    } else {
      this.error = ''
    }
    return cArr
  }
  drop(event: CdkDragDrop<number[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      if (this.all.length === 0) {
        this.gameOver()
        this.gameCompleted = true
      }
    }
  }

  // changeCommand() {
  //   console.log('From change command ', this.command)
  // }


  gameOver() {
    return this.toastr.success('Game Completed');
  }

  countCheck() {
    // console.log(this.categoryCount)
  }

  resetGame() {
    this.all = [2, 4, 6, 11, 12, 21, 22];
    this.animals = [99]
    this.objects = [999]
    this.sports = [9999]
    this.gameCompleted = false
    return this.toastr.info('Reseted!');
  }

  animalPredicate(item: CdkDrag<number>) {
    // console.log(item)
    return item.data < 10;
  }

  objectPredicate(item: CdkDrag<number>) {
    // console.log(item)
    return item.data > 10 && item.data < 20;
  }

  sportsPredicate(item: CdkDrag<number>) {
    // console.log(item)
    return item.data > 20 && item.data < 30;
  }

  noReturnPredicate() {
    return false;
  }

  decreaseCount() {
    if (this.categoryCount > 2) {
      this.categoryCount = this.categoryCount - 1
    } else {
      this.toastr.error('Can\'t decrease the count more')
    }
  }

  increaseCount() {
    if (this.categoryCount < 6) {
      this.categoryCount = this.categoryCount + 1
    } else {
      this.toastr.error('Can\'t increase the count more')
    }
  }

}
