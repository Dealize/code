define(['layerWidget',
        'shapeWidget',
        'brushWidget',
        'basePicWidget'],
    function (layerWidget,
              shapeWidget,
              brushWidget,
              basePicWidget
    ) {
    return [
        {
            fnTitle:'&#xe653;图层',
            fnPanel:layerWidget.LayerWidgetPanel,
            panelData:{},
        },
        {
            fnTitle:'&#xe60d;底图',
            fnPanel:basePicWidget.BasePicWidgetPanel,
        },
        {
            fnTitle:'&#xe67f;画笔',
            fnPanel:brushWidget.BrushWidgetPanel,
        }
    ]
})