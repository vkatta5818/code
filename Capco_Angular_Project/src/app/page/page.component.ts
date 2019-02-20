import { Component, OnInit } from '@angular/core';
import { Employer } from '../shared/employer';
import { EmployerService } from '../services/employer.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  employers: Employer[];
  employersOnPage: Employer[];
  numOfRows: number=20;
  totalNum: number;
  currentPage: number=1;
  startPage: number;
  endPage: number;
  selectionSet: number[]=[10,20,30,40,50];
  pagesArray: number[];
  pagesNumber: number;

  constructor(private employerService: EmployerService) { }

  ngOnInit() {
    this.getEmployers();
  }
  
  getEmployers() {
    this.employerService.getAllEmployers()
    .subscribe(
      m => {
        this.employers = m;
        this.totalNum = m.length;
        this.setEmployersOnPage(this.totalNum+"");
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  setEmployersOnPage(rowsNum: string) {
    // console.log("type:"+typeof(rowsNum));
    this.numOfRows = parseInt(rowsNum);
    this.pagesNumber = Math.ceil(this.totalNum/this.numOfRows);
    this.range(this.pagesNumber);
    // console.log(this.pagesArray);
    this.showPages("1",0);
  }

  range(pages:number) {
    this.pagesArray=[];
    for(let i=0; i<pages; i++) {
      this.pagesArray[i]=i+1;
    }
  }

  showPages(currentPage: string, offset: number) {
    // console.log(typeof(offset));
    this.currentPage = parseInt(currentPage)+offset;
    // console.log(currentPage);
    this.startPage = (this.currentPage-1)*this.numOfRows;
    this.endPage = this.currentPage*this.numOfRows;
    this.employersOnPage = this.employers.slice(this.startPage, this.endPage);
  }

  next1() {
    this.showPages(this.currentPage+"",1);
  }

  pre1() {
    this.showPages(this.currentPage+"",-1);
  }
  
  submit(employer:Employer) {
    let submittedData = {
      "row ID": employer.id,
      "row Status": employer.status
    };
    this.employerService.submitOneEmployer(submittedData);
  }

}
