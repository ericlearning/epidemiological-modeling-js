function rungekutta(f, y0, ts, args) {
    // f: function(y, t, ...args)
    // y0: vector of shape (N)
    // ts: Array of shape (T)
    // args: Array of arguments

    let ys = [y0];
    let n = ts.length;
    let yn;

    for(let i=0; i<n-1; i++){
        // yn_prev: vector of shape (N)
        let yn_prev = ys[ys.length-1];

        // floating point numbers
        let tn_prev = ts[i];
        let tn = ts[i + 1];
        let h = tn - tn_prev;
        
        let k1, k2, k3, k4;
        // k1 = applyVectorEW(yn_prev, f, [tn_prev, ...args]);
        k1 = f(yn_prev, tn_prev, ...args);
        k1 = multVectorEW(k1, h);

        k2 = yn_prev.add(multVectorEW(k1, 1/2))
        // k2 = applyVectorEW(k2, f, [tn_prev+h/2, ...args]);
        k2 = f(k2, tn_prev+h/2, ...args);
        k2 = multVectorEW(k2, h);

        k3 = yn_prev.add(multVectorEW(k2, 1/2))
        // k3 = applyVectorEW(k3, f, [tn_prev+h/2, ...args]);
        k3 = f(k3, tn_prev+h/2, ...args);
        k3 = multVectorEW(k3, h);

        k4 = yn_prev.add(k3);
        // k4 = applyVectorEW(k4, f, [tn, ...args]);
        k4 = f(k4, tn, ...args);
        k4 = multVectorEW(k4, h);

        yn = k1.add(multVectorEW(k2, 2)).add(multVectorEW(k3, 2)).add(k4);
        yn = yn_prev.add(multVectorEW(yn, 1/6));

        ys.push(yn.dup());
    }

    // Matrix of shape (T, N)
    ys = Matrix.create(ys.map(yi => yi.elements));
    return ys;
}