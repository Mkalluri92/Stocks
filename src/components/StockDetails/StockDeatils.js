import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import classes from './StockDetails.module.css';

const StockDetails = (props) => {
    let options;
    let stockPriceTime;
    let diffInPrice;
    let color;
    let profitOrLossSymbol;
    let ranges = ['1 day','5 days','1 month','6 months','YTD','1 year','5 years','Max'];
    let rangeSelectedDecode = {
        '1 day': '1d',
        '5 days': '5d',
        '1 month': '1mo',
        '6 months': '6mo',
        'YTD': 'ytd',
        '1 year': '1y',
        '5 years': '5y',
        'Max': 'max'
    }
    if (props.data.data) {
        diffInPrice = (props.data.data.meta.regularMarketPrice - 
                        props.data.data.meta.chartPreviousClose);
        profitOrLossSymbol = diffInPrice>0 ? '+': '';
        color = diffInPrice>0? 'green': 'red';

        stockPriceTime = props.data.data.timestamp.map((current) => {
            let date = new Date(current * 1000);
            let year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getDate();
            // Hours part from the timestamp
            let hours = date.getHours();
            
            // Minutes part from the timestamp
            let minutes = "0" + date.getMinutes();  
           
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
            "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

            // Will display time in 10:30 format
            var formattedTime = {
                '1d': (hours >= 12 ? (hours + ':' + minutes.substr(-2) +' PM'):(hours + ':' + minutes.substr(-2) +' AM')),
                '5d': monthNames[month]+' '+day,
                '1mo': monthNames[month]+' '+day,
                '6mo': monthNames[month]+' '+year,
                'ytd': monthNames[month]+' '+day,
                '1y': monthNames[month]+' '+year,
                '5y': year,
                'max': year
            }
            return formattedTime[props.data.range];
        })

        options = {
            title: {
                text: ''
            },
            xAxis: {
                minTickInterval: props.data.data.indicators.quote[0].open.length/4,
                categories: stockPriceTime
            },
            yAxis: {
                title: {
                  text: 'Price($)'
                }
            },
            series: [{
                name: "Stock Data",
                color: color,
                data: props.data.data.indicators.quote[0].open
            }],
            legend: {
                title: {
                    text: '<span style="font-size: 9px; color: #666; font-weight: normal"></span>',
                    style: {
                        fontStyle: 'italic'
                    }
                },
                layout: 'horizontal'
            },
            tooltip: {
                formatter: function() {
                 return this.y.toFixed(2) + ' USD ' + this.x
                    }
            },
            plotOptions: {
                spline: {
                    dataLabels: {
                        enabled: 'True',
                        format: '{y} %'
                    },
                    enableMouseTracking: true,
                    crop: 'false',
                    overflow: 'none'
                }
            }
        }
    }
    return (
        props.data.data? (<React.Fragment>
            <div className={classes.details}>
                <span className={classes.name}>
                    {props.data.data.meta.symbol}</span>
                <br />
                <div className={classes.priceDetails}>
                    <span className={classes.price}>
                        {props.data.data.meta.regularMarketPrice}</span>
                    <span className = {color === "red"? classes.red : classes.green} >
                        {profitOrLossSymbol}
                        {diffInPrice.toFixed(2)}</span>
                    <span className = {color === "red"? classes.red : classes.green} >
                        ({profitOrLossSymbol}
                        {`${(diffInPrice / props.data.data.meta.regularMarketPrice * 100).toFixed(2)}%)`} 
                    </span>
                </div>
            </div>
            <div className={classes.validRanges}>
                {ranges.map((current) => {
                    return <span key={current}
                            onClick={props.handleRange}
                            className={((props.data) && 
                                (rangeSelectedDecode[current] === props.data.range))?
                                    classes.rangeSelected: classes.range}>
                        {current}</span>
                })}
            </div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </React.Fragment>): null
    )
}

export default StockDetails;



//https://finance.yahoo.com/_finance_doubledown/api/resource?bkt=fd-strm-mab%2Cfd-wf-notifications%2Cfd-qsp-ncp-eem%2Cfd-fin-instapage&crumb=Bz4dMqvKu1g&device=desktop&feature=adsMigration%2CcanvassOffnet%2CccOnMute%2Cdebouncesearch100%2CdeferDarla%2CemptyServiceWorker%2CenableCMP%2CenableConsentData%2CenableTheming%2CenableNavFeatureCue%2CenableFeatureTours%2CenableFreeFinRichSearch%2CenableGuceJs%2CenableGuceJsOverlay%2CenableNewResearchInsights%2CenablePfSummaryForEveryone%2CenablePremiumSingleCTA%2CenablePremiumScreeners%2CenablePrivacyUpdate%2CenableVideoURL%2CenableYahooSans%2CnewContentAttribution%2CnewLogo%2CoathPlayer%2Cpremium35%2CrelatedVideoFeature%2CreportReactMarkupDiff%2CthreeAmigos%2CwaferHeader%2CvideoNativePlaylist%2CenableCCPAFooter%2Clivecoverage%2CdarlaFirstRenderingVisible%2CenableTradeit%2CenableFeatureBar%2CenableSearchEnhancement%2CenableUserSentiment%2CenableBankrateWidget%2CncpHpStream%2Cload6Items%2CcanvassReplies%2CresearchFilter%2CenableSingleRail%2CenablePremiumFinancials%2CenhanceAddToWL%2CsponsoredAds%2CenableStageAds%2CenableTradeItLinkBrokerSecondaryPromo%2CpremiumPromoHeader%2CenableQspPremiumPromoSmall%2CclientDelayNone%2CthreeAmigosMabEnabled%2CthreeAmigosAdsEnabledAndStreamIndex0%2CmabHpStream%2CenableNotification%2CncpQspReverseChronoStream%2CenableInstapage&intl=us&lang=en-US&partner=none&prid=e7aqiudf7ef3r&region=US&site=finance&tz=America%2FLos_Angeles&ver=0.102.3400