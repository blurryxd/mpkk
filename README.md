http://users.metropolia.fi/~juhohuh/mpkk/w2-http+route/
<br>
Tossa on muuten ongelmia sen routingin takia. Koska home vie '/' ns suoraan indexiin, se vie suoraan users.metropolia.fi/ sivulle.
<br>
Sitten myöskin aloitussivulle ei lataudu mitään ennenkuin painaa home nappia, koska homen sisältö on rakennettu '/' taakse.


<h1>UPDATE 29.3</h1>
Toi sun tiedote ei ollu vielä tullu ja jatkoin jo lokaalisti tohon login tehtävään niin en valitettavasti nyt tähän tehtävään jaksanut lataa repoa ja buildaa uusiksi webdiskille. Login tehtävästä eteenpäin pitäisi toimia kun tiedote tuli siihen.

_________________________________________________

4.4.2019 UPDATE
Mä muutin importista BrowserRouterin HashRouteriin ja poistin basenamen niin alkoi toimimaan. Lueskelin aika paljon stackoverflowta ja löysin jotani implikaatioita että BrowserRouter toimisi yhteensopivasti hyvin vain node.jssän kanssa ja en tiiä mitä webdiski käyttää mut tol hashrouterilla lähti toimimaan.
