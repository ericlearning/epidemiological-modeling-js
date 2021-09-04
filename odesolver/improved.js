function improved_euler(f, y0, ts, args) {
    // f: function(y, t, ...args)
    // y0: vector of shape (N)
    // ts: Array of shape (T)
    // args: Array of arguments

    let ys = [y0];
    let n = ts.length;
    let yn_euler, yn;

    for(let i=0; i<n-1; i++){
        // yn_prev: vector of shape (N)
        let yn_prev = ys[ys.length-1];

        // floating point numbers
        let tn_prev = ts[i];
        let tn = ts[i + 1];
        let h = tn - tn_prev;

        let k1, k2;
        // k1 = applyVectorEW(yn_prev, f, [tn_prev, ...args]);
        k1 = f(yn_prev, tn_prev, ...args);
        yn_euler = yn_prev.add(multVectorEW(k1, h));

        // k2 = applyVectorEW(yn_euler, f, [tn, ...args])
        k2 = f(yn_euler, tn, ...args);
        yn = yn_prev.add(multVectorEW(k1.add(k2), h/2));

        ys.push(yn.dup());
    }

    // Matrix of shape (T, N)
    ys = Matrix.create(ys.map(yi => yi.elements));
    return ys;
}