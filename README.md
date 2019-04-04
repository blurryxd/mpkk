http://users.metropolia.fi/~juhohuh/mpkk/w2-routing-login/


31.3.2019
Jostain syystä mulla ei production build versio toimi samalla lailla kun developement versio. Saan localhostilla kaiken toimimaan ihan moiteetta, mutta production buildi webdiskillä ei renderaa komponentteja.


4.4.2019 UPDATE
Mä muutin importista BrowserRouterin HashRouteriin ja poistin basenamen niin alkoi toimimaan. Lueskelin aika paljon stackoverflowta ja löysin jotani implikaatioita että BrowserRouter toimisi yhteensopivasti hyvin vain node.jssän kanssa ja en tiiä mitä webdiski käyttää mut tol hashrouterilla lähti toimimaan.
