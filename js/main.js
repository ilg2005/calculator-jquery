/* Пишем свой калькулятор на сайт */

$(function () {
    var mCountElement = $('.m-count'),
        floorCountElement = $('.floor-number'),
        materialElements = $('[name=material]'),
        projectElement = $('#project'),
        imgElement = $('img'),
        priceElement = $('#price'),
        errorElement = $('.error'),
        formElement = $('#ajax_form'),
        submitBtnElement = $('button[type=submit]'),
        resultElement = $('.result'),
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
        var formData = new FormData(formElement[0]);
        $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: 'https://phpmaster.pw/test.php',
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                submitBtnElement.hide();
                resultElement.css('display', 'block')
                    .addClass('btn-success');
                console.log(data);
            },
            error: function (e) {
                submitBtnElement.hide();
                resultElement.css('display', 'block')
                    .text('Произошла ошибка! Повторите запрос позже.')
                    .addClass('btn-danger');
                console.log("ERROR : ", e);
            }
        })
    })
});
