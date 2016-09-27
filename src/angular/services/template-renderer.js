import createFactoryFunction from '../utilities/create-factory-function.js';

export class PullInTemplate {
	constructor($sce) {
		this.$sce = $sce;
	}

	convertTemplateUrlToHtml(data, $scope) {
		if (data.templateUrl) {
			let templateUrl = data.templateUrl;
			let safeTemplateUrl = this.$sce.getTrustedResourceUrl(templateUrl);
			let templateKey = this.getTemplateKey(templateUrl);

			$scope[templateKey] = safeTemplateUrl;
			data.html = `<div ng-include="${templateKey}"></div>`;
		}

		return data;
	}

	convertHeaderFooter(header, footer, data, controller) {
		let { templateUrl: headerTemplateUrl, html } = header;
		let { templateUrl: footerTemplateUrl } = footer;

		if (headerTemplateUrl) {
			let safeHeaderTemplateUrl = this.$sce.getTrustedResourceUrl(headerTemplateUrl);

			controller.safeHeaderTemplateUrl = safeHeaderTemplateUrl
			header.html = `<div ng-include="vm.safeHeaderTemplateUrl"></div>`;
			data.header = header;
		}

		if (footerTemplateUrl) {
			let safeFooterTemplateUrl = this.$sce.getTrustedResourceUrl(footerTemplateUrl);

			controller.safeFooterTemplateUrl = safeFooterTemplateUrl
			footer.html = `<div ng-include="vm.safeFooterTemplateUrl"></div>`;
			data.footer = footer;
		}

		if(!header.html){
			header.html = `<h1>${data.name}</h1>`;
			data.header = header;
		}


		return data;
	}

	getTemplateKey(labelTemplateUrl) {
		let newTemplateUrl = labelTemplateUrl.replace('/', '-').replace('.', '-').split('-');
		let newKey = newTemplateUrl.reduce((key, word, index) => {
			if (index === 0) return word;

			let capitalizeWord = word[0].toUpperCase();
			capitalizeWord = capitalizeWord + word.substring(1);

			return `${key}${capitalizeWord}`
		}, '');

		return `${newKey}`;
	}

	convertLabel(defaultLabel = '', data = {}, $scope) {
		let { labelHTML, label = defaultLabel, labelTemplateUrl, id } = data;

		if (labelTemplateUrl) {
			let safeLabelTemplateUrl = this.$sce.getTrustedResourceUrl(labelTemplateUrl);
			let templateKey = this.getTemplateKey(labelTemplateUrl);

			$scope[templateKey] = safeLabelTemplateUrl
			data.labelHTML = `<div ng-include="${templateKey}"></div>`;
		}

		return data;
	}
}

PullInTemplate.$inject = ['$sce'];

export default createFactoryFunction(PullInTemplate);