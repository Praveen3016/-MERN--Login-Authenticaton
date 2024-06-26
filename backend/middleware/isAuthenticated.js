

    export const isAuthenticated = (req, res ,next) =>{
        if(req.isAuthenticated)
            {
                return res.redirect('/home'); // or any route you want
                next();

            }
            else{
                return res.redirect('/home'); // or any route you want
                next();
            }


    }