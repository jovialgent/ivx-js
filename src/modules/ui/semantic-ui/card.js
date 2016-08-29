export class CardTemplates {
    constructor(settings) {
        this.settings = settings;
    }

    get miniCardHTML() {
        return `
        <div class="ui cards">
          <div class="card">
            <div class="content">
                <img class="right floated mini ui image" src="{{vm.img}}">
                <div class="header">
                    {{vm.firstName}} {{vm.lastName}}
                </div>
                <div class="meta">
                        {{vm.title}}
                </div>
                <div class="description">
                    {{vm.description}}
                 </div>
            </div>
            <div class="extra content">
                <div class="ui one buttons">
                    <div ng-click="vm.buttonPressed()" class="ui button">Buy it</div>
                </div>
            </div>
          </div>
          </div>`;
    }

    get dimmerCardHTML() {
        let {classes} = this.settings;
        return ` 
        <div class="ui special cards">  
          <div class="card">
            <div class="blurring dimmable image">
                <div class="ui dimmer">
                    <div class="content">
                        <div class="center">
                            <button ng-click="vm.buttonPressed()" class="ui inverted button">Buy this!</button>
                        </div>
                    </div>
                </div>
                <img ng-src="{{vm.img}}">
            </div>
            <div class="content">
                <a class="header">{{vm.firstName}} {{vm.lastName}}</a>
                <div class="meta">
                    <a>{{vm.title}}</a>
                </div>
                <div class="description">
                    {{vm.description}}
                </div>
            </div>
            </div>
            
        </div>`;
    }
};