import { Component, OnInit } from '@angular/core';
import { ResearchService } from '../../../services/research.service';
import { ResourceCollection } from 'src/app/models/resource';

@Component({
  selector: 'app-si-upgrades',
  templateUrl: './si-upgrades.component.html',
  styleUrls: ['./si-upgrades.component.scss']
})
export class SiUpgradesComponent implements OnInit {

  upgradesAvailable: UpgradeListItem[] = [];
  upgradesComplete: UpgradeListItem[] = [];

  constructor(private _researchService: ResearchService) { }

  ngOnInit() {
    this.updateUpgradeList();
  }

  updateUpgradeList() {
    while (this.upgradesAvailable.length > 0) { this.upgradesAvailable.pop(); }
    while (this.upgradesComplete.length > 0) { this.upgradesComplete.pop(); }

    this._researchService.getCompletedUpgrades().forEach(x => {
      const upgradeDef = this._researchService.getUpgradeDefinition(x);
      const item: UpgradeListItem = {
        name: x,
        researched: true,
        cost: upgradeDef.cost
      };
      this.upgradesComplete.push(item);
    });

    this._researchService.getAvailableUpgrades().forEach(x => {
      const upgradeDef = this._researchService.getUpgradeDefinition(x);
      const item: UpgradeListItem = {
        name: x,
        researched: false,
        cost: upgradeDef.cost
      };
      this.upgradesAvailable.push(item);
    });
  }

  onClickUpgradeItem(item: UpgradeListItem) {
    if (item.researched) { return; }
    this._researchService.buyUpgrade(item.name);
    this.updateUpgradeList();
  }
}

class UpgradeListItem {
  public name: string;
  public researched: boolean;
  public cost: ResourceCollection;
}
