import { Component, Input, OnInit } from '@angular/core';
import {
  faDog,
  faCat,
  faDove,
  faTable,
  faChair,
  faPaw,
  // faTriangleCircleSquare,
  faBicycle,
  faXmark,
  faBaseball,
  faBaseballBall,
  faBaseballBatBall,
  // faRugb  
} from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  bat = faBaseballBatBall
  baseBall = faBaseball
  ball = faBaseballBall
  dog = faDog
  cat = faCat
  dove = faDove
  table = faTable
  chair = faChair
  paw = faPaw
  // angular = faTriangleCircleSquare // TODO: angular icon
  cycle = faBicycle
  cross = faXmark
  choice: any
  @Input() iconChoice: number = 100
  icon: any
  constructor() { }

  ngOnInit(): void {
    this.chooseIcon(this.iconChoice)
  }
  chooseIcon(iconChoice: number) {
    switch (iconChoice) {
      // animals
      case 2:
        this.icon = this.dog
        break;
      case 4:
        this.icon = this.cat
        break;
      case 6:
        this.icon = this.dove
        break;
      // objects
      case 11:
        this.icon = this.table
        break;
      case 12:
        this.icon = this.chair
        break;
      // special
      case 99:
        this.icon = this.paw
        break;
      case 999:
        this.icon = this.cycle
        break;
      case 9999:
        this.icon = this.ball
        break;
      // sports
      case 21:
        this.icon = this.ball
        break;
      case 22:
        this.icon = this.bat
        break;
      case 20:
        this.icon = this.baseBall
        break;

      // case 'chair':
      //     this.icon = this.chair
      //   break;

      default:
        this.icon = this.cross
        break
    }
  }

}
