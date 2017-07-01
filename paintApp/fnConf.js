define(['layerWidget','shapeWidget'],function (layerWidget,shapeWidget) {
    return [
        {
            fnTitle:'图层',
            fnPanel:layerWidget.LayerWidgetPanel,
            panelData:{},
            fnDetail:layerWidget.layerWidget
        },
        // {
        //     fnTitle:'矩形',
        //     fnPanel:shapeWidget.shapeWidgetPanel,
        // },
        // {
        //     fnTitle:'工具3',
        //     fnPanel:shapeWidget.shapeWidgetPanel,
        // }
    ]
})