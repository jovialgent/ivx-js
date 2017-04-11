export default function updateColor(progress, startColorString, endColorString) {
    let startColor = parseRGBA(startColorString);
    let endColor = parseRGBA(endColorString);
    let currentColorValues = Object.keys(startColor).map(colorKey => {
        let startColorValue = startColor[colorKey];
        let endColorValue = endColor[colorKey];


        if (colorKey === 'alpha') {
            let changedValue = (endColorValue - startColorValue);

            return changedValue < 0 ?  (changedValue + 1) *  progress : changedValue *progress;
        }

        let changedValue = ~~((endColorValue - startColorValue) * progress);
        let processedValue = startColorValue + changedValue;

        if (changedValue < 0 && processedValue <= endColorValue) {
            processedValue = endColorValue
        }

        if (changedValue > 0 && processedValue >= endColorValue) {
            processedValue = endColorValue
        }

        return processedValue;
    });
    let rgbaString = convertToRGBAString(currentColorValues);

    return rgbaString;

    function convertToRGBAString(values) {
        let valueStrings = values.join(',');

        if (values.length === 3) {


            return "rgb(" + valueStrings + ")";
        }

        if (values.length === 4) {
            return "rgba(" + valueStrings + ")";
        }
    }


    function parseRGBA(rgba) {
        var isRGB = rgba.indexOf('rgb') >= 0;
        var isRGBA = rgba.indexOf('rgba') >= 0;

        if (isRGBA) {
            var removedRGBA = rgba.replace('rgba', '');
            var removedParenthesis = removeParenthesis(removedRGBA);
            var rgbaValues = removedParenthesis.split(',').map(value => {
                return parseInt(value.trim());
            });
            var colorObj = rgbaValues.reduce((obj, value, index) => {
                if (index === 0) {
                    obj.r = value;
                }

                if (index === 1) {
                    obj.g = value;
                }

                if (index === 2) {
                    obj.b = value;
                }

                if (index === 3) {
                    obj.alpha = value;
                }

                return obj;
            }, {});

            return colorObj;
        }


        if (isRGB) {
            var removedRGB = rgba.replace('rgb', '');
            var removedParenthesis = removeParenthesis(removedRGB);
            var rgbValues = removedParenthesis.split(',').map(value => {
                return parseInt(value.trim());
            });
            var colorObj = rgbValues.reduce((obj, value, index) => {
                if (index === 0) {
                    obj.r = value;
                }

                if (index === 1) {
                    obj.g = value;
                }

                if (index === 2) {
                    obj.b = value;
                }

                return obj;
            }, {})


            return colorObj;
        }




        function removeParenthesis(string) {
            return string.replace(/["'()]/g, "")
        }
    }

}

