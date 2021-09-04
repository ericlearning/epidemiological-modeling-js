function changeModelParam(model, modelParam, param){
    for (let i=0; i<modelParam.length; i++){
        model[modelParam[i]] = initParam[i];
    }
}

function sliderInit(initValue, x, y, w, p=null) {
    let out = [];
    let initVal = [];
    for (let i = 0; i < initValue.length; i++) {
        let cur_slider;
        if (p == null){
            cur_slider = createSlider(initValue[i][0],
                initValue[i][1], initValue[i][2], 0);
        }
        else{
            cur_slider = p.createSlider(initValue[i][0],
                initValue[i][1], initValue[i][2], 0);
        }
        cur_slider.position(x, i * y[0] + y[1]);
        cur_slider.style('width', w + 'px');
        out.push(cur_slider)
        initVal.push(initValue[i][2]);
    }
    return [out, initVal];
}

function checkboxInit(ref, f, p=null) {
    if (p == null){
        checkbox = createCheckbox('', true);
    }
    else{
        checkbox = p.createCheckbox('', true);
    }
    checkbox.changed(f);
    checkbox.position(ref.x + ref.width + 120, ref.y + 2);
    return checkbox;
}

function drawUI(sliders, slidersParam, legends, legendsParam, checkbox, realN, colors, p=null){
    if (p == null){
        drawUIGlobal(sliders, slidersParam, legends, legendsParam, checkbox, realN, colors);
    }
    else{
        drawUIInstance(sliders, slidersParam, legends, legendsParam, checkbox, realN, colors, p);
    }
}

function drawUIGlobal(sliders, slidersParam, legends, legendsParam, checkbox, realN, colors) {
    fill(0);
    textSize(14);
    for (let i = 0; i < sliders.length; i++) {
        text(legends[i], sliders[i].x + sliders[i].width + 25, sliders[i].y + 17);
    }
    for (let i = 0; i < slidersParam.length; i++) {
        text(legendsParam[i], slidersParam[i].x + slidersParam[i].width + 12, slidersParam[i].y + 17);
    }
    text('Fixed N', checkbox.x + 27, sliders[0].y + 17)
    textSize(12);
    text('People', checkbox.x + 73, sliders[0].y + 47)
    textSize(23);
    text(Math.round(realN), checkbox.x + 5, sliders[0].y + 47)

    for (let i = 0; i < sliders.length; i++) {
        fill(colors[i]);
        circle(sliders[i].x + sliders[i].width + 14, sliders[i].y + 12, 10);
    }
}

function drawUIInstance(sliders, slidersParam, legends, legendsParam, checkbox, realN, colors, p) {
    p.fill(0);
    p.textSize(14);
    for (let i = 0; i < sliders.length; i++) {
        p.text(legends[i], sliders[i].x + sliders[i].width + 25, sliders[i].y + 17);
    }
    for (let i = 0; i < slidersParam.length; i++) {
        p.text(legendsParam[i], slidersParam[i].x + slidersParam[i].width + 12, slidersParam[i].y + 17);
    }
    p.text('Fixed N', checkbox.x + 27, sliders[0].y + 17)
    p.textSize(12);
    p.text('People', checkbox.x + 73, sliders[0].y + 47)
    p.textSize(23);
    p.text(Math.round(realN), checkbox.x + 5, sliders[0].y + 47)

    for (let i = 0; i < sliders.length; i++) {
        p.fill(colors[i]);
        p.circle(sliders[i].x + sliders[i].width + 14, sliders[i].y + 12, 10);
    }
}

function generatePointsMulti(t, rk, N) {
    let out = [];
    for (i = 0; i < N; i++) {
        out.push(generatePoints(t, rk.col(i + 1).elements));
    }
    return out;
}

function addLayers(plt, layerNames, allPoints, colors) {
    for (i = 0; i < layerNames.length; i++) {
        plt.addLayer(layerNames[i], allPoints[i]);
        plt.getLayer(layerNames[i]).setPointColor(colors[i]);
    }
}

function setLayers(plt, layerNames, allPoints) {
    for (i = 0; i < layerNames.length; i++) {
        plt.getLayer(layerNames[i]).setPoints(allPoints[i]);
    }
}

function getSliderValues(sliders) {
    let out = [];
    for (i = 0; i < sliders.length; i++) {
        out.push(sliders[i].value());
    }
    return out;
}

function drawPlot(plt) {
    plt.beginDraw();
    plt.drawBackground();
    plt.drawBox();
    plt.drawXAxis();
    plt.drawYAxis();
    plt.drawTopAxis();
    plt.drawRightAxis();
    plt.drawTitle();
    plt.drawPoints();
    plt.drawLines();
    plt.endDraw();
}