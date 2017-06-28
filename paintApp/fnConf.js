define(['layerWidget','rectWidget'],function (layerWidget,rectWidget) {
    return [
        {
            fnTitle:'图层',
            fnPanel:layerWidget.LayerWidgetPanel,
            panelData:{},
            fnDetail:layerWidget.layerWidget
        },
        {
            fnTitle:'矩形',
            fnPanel:rectWidget.rectWidgetPanel,
            fnDetail:rectWidget.rectWidget
        },
        {
            fnTitle:'工具3',
            fnPanel:rectWidget.rectWidgetPanel,
            fnDetail:rectWidget.rectWidget
        }
    ]
})