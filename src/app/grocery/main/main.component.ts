import { Component, OnInit } from "@angular/core";
import { GroceryService } from "../grocery.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  constructor(private groceryService: GroceryService) {}

  ngOnInit(): void {
    this.groceryService
      .get()
      .pipe(finalize(() => {}))
      .subscribe(
        (data: any) => {
          console.warn(data);
        },
        (error: any) => {}
      );
  }
}
