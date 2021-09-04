// plotting parameters
let plt;
let slider;
let slider_value;
let x_min = -2;
let x_max = 2;
let gt_points, eu_points, im_points, rk_points;
const eps = 1e-7;

// t, solution, and predictions
let t, gt, eu, im, rk;

// generate points for the plot given xs, ys
function generatePoints(xs, ys) {
    let p = [];
    for (let i = 0; i <= xs.length; i ++) {
        p.push(new GPoint(xs[i], ys[i]));
    }
    return p
}

// ODE and a known solution
function f1(y, t, n) {
    let cur_y = y.elements[0];
    let out = n - cur_y;
    return Vector.create([out]);
}

function f1_sol(t, n, init) {
    return (init - n) * exp(-t) + n;
}

// run rungekutta, return t, solution, and prediction
function run_analysis(f, init=[7.0], args=[12]) {
    // init: vector of shape N
    // f1, f1_sol: takes in a single element

    // rungekutta: applies f1 over each element of init
    //             to return Matrix of shape (T, N)
    // batchinf: same job as rungekutta, but just
    //            inference on f1_sol's elements

    init = Vector.create(init);

    let t_min = 0.0;
    let t_max = 10.0;
    let h = 0.1;
    let t = range(t_min, t_max, h)

    let gt = batchinf(f1_sol, init, t, args);
    let eu = euler(f, init, t, args);
    let im = improved_euler(f, init, t, args);
    let rk = rungekutta(f, init, t, args);
    return [t, gt, eu, im, rk];
}

// setup the visualizations for the analyses
function setup() {
    createCanvas(500, 500);

    init_slider = createSlider(-20.0, 20.0, 7.0, 0)
    args_slider = createSlider(-20.0, 20.0, 12.0, 0)
    init = [init_slider.value()];
    args = [args_slider.value()];

    [t, gt, eu, im, rk] = run_analysis(f1, init, args);
    gt_points = generatePoints(t, gt.col(1).elements);
    eu_points = generatePoints(t, eu.col(1).elements);
    im_points = generatePoints(t, im.col(1).elements);
    rk_points = generatePoints(t, rk.col(1).elements);

    plt = new GPlot(this, 0, 0, width, height);
    plt.addLayer("gt_points", gt_points);
    plt.getLayer("gt_points").setPointColor(color(255, 0, 0));
    plt.addLayer("eu_points", eu_points);
    plt.getLayer("eu_points").setPointColor(color(0, 255, 0));
    plt.addLayer("im_points", im_points);
    plt.getLayer("im_points").setPointColor(color(255, 255, 0));
    plt.addLayer("rk_points", rk_points);
    plt.getLayer("rk_points").setPointColor(color(0, 0, 255));
    plt.getXAxis().setAxisLabelText("this is x");
    plt.getYAxis().setAxisLabelText("this is y");
    plt.setTitleText("this is title");
}

// draw the plot and update them based on slider value
function draw() {
    if (init[0] != init_slider.value() || args[0] != args_slider.value()) {
        init = [init_slider.value()];
        args = [args_slider.value()];

        [t, gt, eu, im, rk] = run_analysis(f1, init, args);
        gt_points = generatePoints(t, gt.col(1).elements);
        eu_points = generatePoints(t, eu.col(1).elements);
        im_points = generatePoints(t, im.col(1).elements);
        rk_points = generatePoints(t, rk.col(1).elements);

        plt.getLayer("gt_points").setPoints(gt_points);
        plt.getLayer("eu_points").setPoints(eu_points);
        plt.getLayer("im_points").setPoints(im_points);
        plt.getLayer("rk_points").setPoints(rk_points);
    }

    background(255);
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