class SIR{
    constructor(beta, gamma){
        this.beta = beta;
        this.gamma = gamma;
    }
    
    ds_dt = (S, I, R) => {
        let N = S + I + R;
        return -(this.beta * I * S) / N;
    }
    
    di_dt = (S, I, R) => {
        let N = S + I + R;
        return (this.beta * I * S) / N - this.gamma * I;
    }
    
    dr_dt = (S, I, R) => {
        return this.gamma * I;
    }
    
    interact = (all, t) => {
        let S, I, R;
        let ds_dt, di_dt, dr_dt;
        [S, I, R] = all.elements;
        ds_dt = this.ds_dt(S, I, R);
        di_dt = this.di_dt(S, I, R);
        dr_dt = this.dr_dt(S, I, R);
        return Vector.create([ds_dt, di_dt, dr_dt]);
    }
}

class SIRS{
    constructor(beta, gamma, tau){
        this.beta = beta;
        this.gamma = gamma;
        this.tau = tau;
    }
    
    ds_dt = (S, I, R) => {
        let N = S + I + R;
        return -(this.beta * I * S) / N + this.tau * R;
    }
    
    di_dt = (S, I, R) => {
        let N = S + I + R;
        return (this.beta * I * S) / N - this.gamma * I;
    }
    
    dr_dt = (S, I, R) => {
        return this.gamma * I - this.tau * R;
    }

    interact = (all, t) => {
        let S, I, R;
        let ds_dt, di_dt, dr_dt;
        [S, I, R] = all.elements;
        ds_dt = this.ds_dt(S, I, R);
        di_dt = this.di_dt(S, I, R);
        dr_dt = this.dr_dt(S, I, R);
        return Vector.create([ds_dt, di_dt, dr_dt]);
    }
}

class SEIR{
    constructor(beta, gamma, delta){
        this.beta = beta;
        this.gamma = gamma;
        this.delta = delta;
    }
    
    ds_dt = (S, E, I, R) => {
        let N = S + E + I + R;
        return -(this.beta * I * S) / N;
    }
    
    de_dt = (S, E, I, R) => {
        let N = S + E + I + R;
        return (this.beta * I * S) / N - this.delta * E;
    }

    di_dt = (S, E, I, R) => {
        return this.delta * E - this.gamma * I;
    }
    
    dr_dt = (S, E, I, R) => {
        return this.gamma * I;
    }

    interact = (all, t) => {
        let S, E, I, R;
        let ds_dt, de_dt, di_dt, dr_dt;
        [S, E, I, R] = all.elements;
        ds_dt = this.ds_dt(S, E, I, R);
        de_dt = this.de_dt(S, E, I, R);
        di_dt = this.di_dt(S, E, I, R);
        dr_dt = this.dr_dt(S, E, I, R);
        return Vector.create([ds_dt, de_dt, di_dt, dr_dt]);
    }
}

class SIRVital{
    constructor(beta, gamma, lambd, mu){
        this.beta = beta;
        this.gamma = gamma;
        this.lambd = lambd;
        this.mu = mu;
    }
    
    ds_dt = (S, I, R) => {
        let N = S + I + R;
        return -(this.beta * I * S) / N - this.mu * S + this.lambd * N;
    }
    
    di_dt = (S, I, R) => {
        let N = S + I + R
        return (this.beta * I * S) / N - this.gamma * I - this.mu * I;
    }
    
    dr_dt = (S, I, R) => {
        return this.gamma * I - this.mu * R;
    }
    
    interact = (all, t) => {
        let S, I, R;
        let ds_dt, di_dt, dr_dt;
        [S, I, R] = all.elements;
        ds_dt = this.ds_dt(S, I, R);
        di_dt = this.di_dt(S, I, R);
        dr_dt = this.dr_dt(S, I, R);
        return Vector.create([ds_dt, di_dt, dr_dt]);
    }
}