import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { HowToPage } from '../how-to/how-to';



@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage {

	homePage = HomePage;
	howToPage = HowToPage;
}
