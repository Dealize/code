define(['layerWidget',
        'shapeWidget',
        'brushWidget'],
    function (layerWidget,
              shapeWidget,
              brushWidget
    ) {
    return [
        {
            fnTitle:'&#xe653;图层',
            fnPanel:layerWidget.LayerWidgetPanel,
            panelData:{},
        },
        // {
        //     fnTitle:'形状',
        //     fnPanel:shapeWidget.shapeWidgetPanel,
        // },
        {
            fnTitle:'&#xe67f;画笔',
            fnPanel:brushWidget.BrushWidgetPanel,
        }
    ]
})