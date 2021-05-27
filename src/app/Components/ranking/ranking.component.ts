import { Component, OnInit } from '@angular/core';
import { RankingService } from 'src/app/Service/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  constructor(private http: RankingService) { }

  data: any;
  name: any = "";
  pointOne: any = "";
  pointTwo: any;
  pointThree: any;
  pointFour: any;
  round: any = 1;
  idPlayer: any;
  position: any = 1;
  arrayPositions: any = [];

  ngOnInit(): void {
    this.getFixedPlayers();
  }

  getFixedPlayers() {
    // Requisição do serviço que obtém os jogadores
    this.http.getPlayers().subscribe((players: any) => {
      this.round = 1;
      this.data = this.ranking(players);
    });
  }

  addValue() {
    switch(this.round) {
      
      case 1: 
        const newPlayer = { name: this.name, points: parseInt(this.pointOne) }
        this.http.postPlayer(newPlayer).subscribe((players: any) => {
          this.data = this.ranking(players);
          players.forEach((data: any) => {
            if(data.name == this.name) {
              this.idPlayer = data.id;
            }
          });
        });
        this.round++;
      break;

      case 2:
        const putPointOne = { name: this.name, points: parseInt(this.pointTwo) }
        this.http.putPlayer(this.idPlayer, putPointOne).subscribe((players: any) => {
          this.data = this.ranking(players);
        });
        this.round++;
      break;

      case 3:
        const putPointsThree = { name: this.name, points: parseInt(this.pointThree) }
        this.http.putPlayer(this.idPlayer, putPointsThree).subscribe((players: any) => {
          this.data = this.ranking(players);
        });
        this.round++;
      break;

      case 4:
        const putPointsFour = { name: this.name, points: parseInt(this.pointFour) }
        this.http.putPlayer(this.idPlayer, putPointsFour).subscribe((players: any) => {
          this.data = this.ranking(players);
        });
        this.round++;
      break;

    }
  }

  ranking(list: any) {
    this.position = 1;
    this.arrayPositions = [];

    list.sort(function (a: any, b: any) {
      if (a.points < b.points) {
        return 1;
      }
      if (a.points > b.points) {
        return -1;
      }
      return 0;
    });

    for(let i = 0; i < list.length; i++) {
        if(i == list.length-1) {
          if(list[i-1].points > list[i].points) {
            let ranking = { ranking: this.position };
            this.arrayPositions.push(ranking);
          } else if(list[i-1].points == list[i].points) {
            let ranking = { ranking: this.position };
            this.arrayPositions.push(ranking);
          }
        }

        if(i+1 < list.length) {
          if(list[i].points > list[i+1].points) {
            let ranking = { ranking: this.position };
            this.arrayPositions.push(ranking);
            this.position++;
          } else if (list[i].points == list[i+1].points) {
            let ranking = { ranking: this.position };
            this.arrayPositions.push(ranking);
          } 
        }
    }

    return list;
  }

  restart() {
    this.http.deletePlayer(this.idPlayer).subscribe((players: any) => {

      this.round = 1;
      this.name = "";
      this.pointOne = "";
      this.pointTwo = "";
      this.pointThree = "";
      this.pointFour = "";
      this.idPlayer = "";;

      this.getFixedPlayers();
    });
  }

}
