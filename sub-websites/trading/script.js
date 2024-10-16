
paymentYearly = true

$('*').addClass('notranslate')

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const $target = $(entry.target);

            switch (true) {
                case $target.hasClass('bg'):
                    $target.addClass('bg-start-animate');
                    break;
                case $target.hasClass('left'):
                    $target.addClass('start-animate-left');
                    break;
                case $target.hasClass('right'):
                    $target.addClass('start-animate-right');
                    break;
                case $target.is('.p1, .p2, .p3, .p5, ' +
                    '.button-subscription-type, .button-primary'):
                    $target.addClass('p-start-animate');
                    break;
                case $target.is('.card'):
                    $target.addClass('card-start-animate');
                    break;
                case $target.is('h2, .img-container'):
                    $target.addClass('start-animate');
                    break;
                case $target.hasClass('sub-card'):
                    $target.addClass('sub-card-animate');
                    break;
                default:
                    $target.addClass('');
            }
        }
    });
}, {
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.4
});

class subscriptionPlan {
    constructor(name = 'Basic', price = 19.99,
                features= 1, special = false, buttonType = 'button-ghost') {
        this.name = name;
        this.priceMonth = price;
        this.priceYear = Math.round(price * 12 * 100) / 100;
        this.priceMonthDiscount = Math.round(price * 0.75 * 100) / 100;
        this.priceYearDiscount = Math.round(price * 12 * 0.75 * 100) / 100;
        this.features = features;
        this.special = special
        this.buttonType = buttonType
    }
}

const subscriptionPlanList = [
    new subscriptionPlan('Basic', 4.99, 2),
    new subscriptionPlan('Mid', 14.99, 3, true, 'primary'),
    new subscriptionPlan('Pro', 44.99, 4)
]

function generatePlans(plans) {
    const container = $('.subscription-container');

    plans.forEach(plan => {
        let specialClass = plan.special ? 'special' : '';
        let buttonClass = specialClass === 'special' ? 'button-ghost' : 'button-ghost';

        let card = $(`
                <div class="sub-card ${specialClass}">
                    <h3>${plan.name}</h3>
                    <hr>
                    <div class="price-tag">
                        <div class="month">
                            <p class="price-month">$${plan.priceMonth}</p>
                            <p>/mo</p>
                        </div>
                        <div class="year">
                            <p class="price-year">$${plan.priceYear}</p>
                            <p class="price-year">$${plan.priceYear} /yr</p>
                        </div>
                    </div>
                    <hr>
                    <p>This plan includes:</p>
                    <div class="sub-items">
                    </div>
                    <hr>
                    <button class="${buttonClass}" style="width: 100%">Select</button>
                </div>
            `);

        for (let i = 1; i <= 4; i++) {
            if (i <= plan.features) {
                let featureItem = $(`
                        <div class="list-item">
                            <img src="./media/icons/check.svg" alt="">
                            <p>List item</p>
                        </div>`);
                card.find('.sub-items').append(featureItem);
            }
            else {
                let featureItem = $(`
                        <div class="list-item" style="opacity: 0.5">
                            <img src="./media/icons/cross.svg" alt="">
                            <p>List item</p>
                        </div>`);
                card.find('.sub-items').append(featureItem);
            }
        };
        container.append(card);
    });
}

$(document).ready(function() {
    generatePlans(subscriptionPlanList);

    hiddenElements = $('h2, h3, .p2, .p3, .p5,' +
        '.bg, .card, .sub-card, .left, .wrapper-horizontal,' +
        '.button-subscription-type, .button-primary, .img-container');
    hiddenElements.each(function(index, el) {
        observer.observe(el);
    })

    function updatePrice (e) {
        if (paymentYearly == true) {
            for (let i = 0; i < 3; i++) {
                $('.button-subscription-type .button-subscription-type-stroke').css({
                    left: 'calc(50% - 0.5em)', width: 'calc(50% + 0.25em)'})
                var priceMonthNew = subscriptionPlanList[i].priceMonthDiscount;
                var priceYearNew = subscriptionPlanList[i].priceYearDiscount;
                var target = $('.sub-card:nth-of-type(' + (i + 1) + ')')
                target.find('.price-month').text('$' + priceMonthNew);
                target.find('.price-year:nth-of-type(1)').css({display: 'inline-block'});
                target.find('.price-year:nth-of-type(2)').text('$' + priceYearNew + ' /yr');
            };
            $('.payment-type p:nth-of-type(1)').css({opacity: '0.5'});
            $('.payment-type p:nth-of-type(2)').css({opacity: '1'});
            paymentYearly = false;
        }
        else {
            for (let i = 0; i < 3; i++) {
                $('.button-subscription-type .button-subscription-type-stroke').css({
                    left: '0.25em', width: 'calc(50% - 0.25em)'})
                var priceYearNew = subscriptionPlanList[i].priceYear;
                var priceMonthNew = subscriptionPlanList[i].priceMonth;
                var target = $('.sub-card:nth-of-type(' + (i + 1) + ')')
                target.find('.price-month').text('$' + priceMonthNew)
                target.find('.price-year:nth-of-type(1)').css({display: 'none'});
                target.find('.price-year:nth-of-type(2)').text('$' + priceYearNew + ' /yr');
            }
            $('.payment-type p:nth-of-type(1)').css({opacity: '1'});
            $('.payment-type p:nth-of-type(2)').css({opacity: '0.5'});
            paymentYearly = true;
        }
    }
    updatePrice()
    $('.button-subscription-type').on('click',function (e) {
        updatePrice(e)
    })
});

let dangerOn = false;

$('.danger-button').on('click', function(e) {
    if (dangerOn === false) {
        $(this).css({
            height: '50rem',
            width: 'calc(100% - 8rem)',
            borderRadius: '4rem',
            padding: '4rem',
            gap: '2rem',
        });
        dangerOn = true;
    }
    else {
        $(this).css({
            height: '6rem',
            width: '6rem',
            borderRadius: '10rem',
            padding: '1rem',
            gap: '0',
        })
        dangerOn = false;
    }
});


$('.button-primary').animate({
    rotate: '360deg',
}, duration(1000), function () {
    //nthng
})
