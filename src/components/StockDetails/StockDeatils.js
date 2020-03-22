import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'



const StockDetails = (props) => {
    console.log(props.data);
    let options;
    let stockPriceTime;
    if (props.data) {
        stockPriceTime = props.data.data.chart.result[0].timestamp.map((current) => {
            var date = new Date(current * 1000);
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
 
           // Will display time in 10:30 format
            var formattedTime = hours + ':' + minutes.substr(-2);

            return formattedTime;
        })

        options = {
            title: {
                text: 'Stock Price'
            },
        
            subtitle: {
                text: 'Source: Yahoo Finance'
            },
            xAxis: {
                title: {
                    text: 'Time'
                },
                minTickInterval: props.data.data.chart.result[0].indicators.quote[0].open.length/4,
                categories: stockPriceTime,
            },
            yAxis: {
                title: {
                  text: 'Price($)'
                }
            },
            series: [{
                name: "Stock Data",
                data: props.data.data.chart.result[0].indicators.quote[0].open
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
                 return  this.series.name +
                        '</b><br/>Price$: '+ this.y.toFixed(2) +
                         '</b><br/>Time: '+  this.x;
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
        props.data? (<div>
            <div>{props.data.data.chart.result[0].meta.symbol}</div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>): null
    )
}

export default StockDetails;



//https://finance.yahoo.com/_finance_doubledown/api/resource?bkt=fd-strm-mab%2Cfd-wf-notifications%2Cfd-qsp-ncp-eem%2Cfd-fin-instapage&crumb=Bz4dMqvKu1g&device=desktop&feature=adsMigration%2CcanvassOffnet%2CccOnMute%2Cdebouncesearch100%2CdeferDarla%2CemptyServiceWorker%2CenableCMP%2CenableConsentData%2CenableTheming%2CenableNavFeatureCue%2CenableFeatureTours%2CenableFreeFinRichSearch%2CenableGuceJs%2CenableGuceJsOverlay%2CenableNewResearchInsights%2CenablePfSummaryForEveryone%2CenablePremiumSingleCTA%2CenablePremiumScreeners%2CenablePrivacyUpdate%2CenableVideoURL%2CenableYahooSans%2CnewContentAttribution%2CnewLogo%2CoathPlayer%2Cpremium35%2CrelatedVideoFeature%2CreportReactMarkupDiff%2CthreeAmigos%2CwaferHeader%2CvideoNativePlaylist%2CenableCCPAFooter%2Clivecoverage%2CdarlaFirstRenderingVisible%2CenableTradeit%2CenableFeatureBar%2CenableSearchEnhancement%2CenableUserSentiment%2CenableBankrateWidget%2CncpHpStream%2Cload6Items%2CcanvassReplies%2CresearchFilter%2CenableSingleRail%2CenablePremiumFinancials%2CenhanceAddToWL%2CsponsoredAds%2CenableStageAds%2CenableTradeItLinkBrokerSecondaryPromo%2CpremiumPromoHeader%2CenableQspPremiumPromoSmall%2CclientDelayNone%2CthreeAmigosMabEnabled%2CthreeAmigosAdsEnabledAndStreamIndex0%2CmabHpStream%2CenableNotification%2CncpQspReverseChronoStream%2CenableInstapage&intl=us&lang=en-US&partner=none&prid=e7aqiudf7ef3r&region=US&site=finance&tz=America%2FLos_Angeles&ver=0.102.3400