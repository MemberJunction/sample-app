import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../utils/shared-service';
import { EntityFieldInfo, EntityInfo, LogError, Metadata, RunView } from '@memberjunction/core';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent {
  public searchText: string = '';
  public searchResults: any[] | null = null;
  public visibleColumns: any[] = [];
  public runningSearch: boolean = false;
  public searchCriteria: Array<any> = [
    { name: "Book Topics", value: 'Topics' },
    { name: "Book Title", value: 'Books' },
    { name: "Book Categories", value: 'Book Categories' }
  ];
  public selectedCriteria = this.searchCriteria[0];

  constructor(private router: Router, private route: ActivatedRoute, private sharedService: SharedService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const search = params['search'];
      const criteria = params['criteria'];
      if (search) {
        // Run your search function here
        const tempIdx = this.searchCriteria.findIndex(item => item.value === criteria);
        this.selectedCriteria = this.searchCriteria[tempIdx || 0];
        this.searchText = search;
        this.doSearch();
      }
    });
  }

  public async doSearch() {
    try {
      this.runningSearch = true; // not the same search, turn on the indicator
      this.sharedService.setupComplete$.subscribe(async (isComplete) => {
        if (isComplete) {
          const rv = new RunView();
          const md = new Metadata();
          const trEntity = md.Entities.find(e => e.Name === this.selectedCriteria.value);
          if (!trEntity)
            throw new Error('Could not find books');

          let ExtraFilter = '';
          switch (this.selectedCriteria.value) {
            case ('Topics'): {
              ExtraFilter = `Id IN (SELECT bt.BookID from books.vwBookTopics bt WHERE bt.Topic LIKE '%${this.searchText}%')`;
              break;
            }
            case ('Categories'): {
              ExtraFilter = `BookCategory LIKE '%${this.searchText}%'`;
              break;
            }
            default: {
              ExtraFilter = `Name LIKE '%${this.searchText}%'`;
              break;
            }
          }
          const result = await rv.RunView({
            EntityName: 'Books',
            ExtraFilter
          });


          if (result && result.Success) {
            this.searchResults = result.Results;
          }
          this.router.navigate([], {
            queryParams: { search: this.searchText, criteria: this.selectedCriteria.value },
            queryParamsHandling: 'merge', // merge with the current query params
            replaceUrl: true // if you want to replace the current entry in the history
          });
          SharedService.SetCacheItem('book-search-results', this.searchResults);
          SharedService.SetCacheItem('book-search-string', this.searchText);

          this.runningSearch = false;
        }
      });
    }
    catch (e) {
      this.runningSearch = false;
      this.sharedService.DisplayNotification('Error running search', 'error');
      LogError(e);
    }
  }


  onGridRowClick(e: any) {
    this.router.navigate(['book-detail', e.dataItem.ID]);
  }
}