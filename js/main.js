/* Пишем свой калькулятор на сайт */

$(function () {
    var mCountElement = $('.m-count'),
        floorCountElement = $('.floor-number'),
        materialElements = $('[name=material]'),
        projectElement = $('#project'),
        imgElement = $('img'),
        priceElement = $('#price'),
        errorElement = $('.error'),
        formElement = $('form'),
        formData = {a: 1, b:2},
        basePrice = 500000,
        projectPrice = 50000,
        baseMCount = 20,
        woodCoefficient = 1,
        bricksCoefficient = 2


    function getCalculationValues() {
        return {
            metersCnt: +mCountElement.val(),
            floorsCnt: +floorCountElement.val(),
            materialType: $('input:checked[name=material]').val(),
            projectCost: +projectElement.val()
        }
    }

    function changePicture() {
        var src = 'img/' + getCalculationValues().materialType + '_' + getCalculationValues().floorsCnt + '.jpg';
        imgElement.attr('src', src);
    }

    function calculatePrice() {
        var params = getCalculationValues();

        var newPrice = params.metersCnt * basePrice / baseMCount;
        newPrice *= params.floorsCnt;
        var materialCoefficient = (params.materialType === 'wood') ? woodCoefficient : bricksCoefficient;
        newPrice *= materialCoefficient;
        newPrice += params.projectCost;
        return new Intl.NumberFormat('ru-RU').format(newPrice);
    }

    mCountElement.maskAsNumber().on('keyup', function () {
        if (+mCountElement.val() >= baseMCount) {
            errorElement.hide();
            priceElement.text(calculatePrice());
        } else {
            errorElement.show();
        }
    })


    floorCountElement.on('change', function () {
        changePicture();
        priceElement.text(calculatePrice());
    })

    materialElements.on('change', function () {
        materialElements.each(function (indx, element) {
            element.toggleAttribute('checked');
        });
        changePicture();
        priceElement.text(calculatePrice());
    })

    projectElement.on('change', function () {
        this.toggleAttribute('checked');
        var cost = projectElement.is(':checked') ? projectPrice : 0;
        projectElement.val(cost);
        priceElement.text(calculatePrice());
    })

    formElement.on('submit', function (evt) {
        evt.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'https://phpmaster.pw/test.php',
            data: formData,
            success: function (data) {
                console.log(data);
            }
        })
    })
});
