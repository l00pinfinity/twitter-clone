import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {

  trends$: Observable<any[]>;
  size = 10;

  constructor(private data:DataService,private authService: AuthService) { 
    this.trends$ = this.getTrendsForYou();
  }

  ngOnInit(): void {
  }

  getTrendsForYou(): Observable<any[]> {
    return this.data.getTrendsForYou(this.size);
  }

}
