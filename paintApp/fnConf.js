define(['layerWidget',
        'shapeWidget',
        'brushWidget',
        'basePicWidget',
        'colorWidget'
        ],
    function (layerWidget,
              shapeWidget,
              brushWidget,
              basePicWidget,
              colorWidget
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
        },{
            fnTitle:'&#xe60a;颜色',
            fnPanel:colorWidget.ColorWidgetPanel
        },{
            fnTitle:'&#xe6ff;形状',
            fnPanel:shapeWidget.ShapeWidgetPanel
        }
    ]
})