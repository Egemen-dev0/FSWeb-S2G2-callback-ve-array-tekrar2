const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const filteredData = fifaData.filter((matches) => matches.Year === 2014 && matches.Stage === "Final")
console.log(filteredData[0]["Home Team Name"])
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
console.log(filteredData[0]["Away Team Name"])
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log(filteredData[0]["Home Team Goals"])
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log(filteredData[0]["Away Team Goals"])
//(e) 2014 Dünya kupası finali kazananı*/
let winner = [];
if (filteredData[0]["Away Team Goals"] > filteredData[0]["Home Team Goals"]) {
	winner.push(filteredData[0]["Away Team Name"])
} else {
	winner.push(filteredData[0]["Home Team Name"])
}
console.log(winner);
/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(arrTtoBeLooked) {
	return arrTtoBeLooked.filter((match) => match.Stage === "Final")
}
console.table(Finaller(fifaData));




/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(arrTtoBeLooked, callback) {
	return callback(arrTtoBeLooked).map((yil) => yil.Year);
}
console.table(Yillar(fifaData, Finaller));



/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(arrTtoBeLooked, callbackFinal) {
	const winnersNames = [];
	const filteredArr = callbackFinal(arrTtoBeLooked);

	const winnerFinder = filteredArr.map((finalMatch) => {
		const evSahibiGolleri = finalMatch["Home Team Goals"];
		const misafirGolleri = finalMatch["Away Team Goals"];

		if (evSahibiGolleri > misafirGolleri) {
			winnersNames.push(finalMatch["Home Team Name"])
		} else if (evSahibiGolleri < misafirGolleri) {
			winnersNames.push(finalMatch["Away Team Name"])
		}
	});
	return winnersNames

}

console.table(Kazananlar(fifaData, Finaller));




/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(arrTtoBeLooked, callbackFinal, callbackYillar, callbackKazananlar) {
	const finalistsData = callbackFinal(arrTtoBeLooked)
	const yearsData = callbackYillar(finalistsData, callbackFinal);
	const winners = callbackKazananlar(finalistsData, callbackFinal);
	let result = [];
	for (let i = 0; i < finalistsData.length; i++) {
		result.push(`${yearsData[i]} yılında, ${winners[i]} dünya kupasını kazandı!`)
	}
	return result;
}
console.table(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(callbackFinal) {

	const total = callbackFinal.reduce((toplam, deger) => {
		return toplam + deger["Home Team Goals"] + deger["Away Team Goals"]
	}, 0)
	let avrg = (total / (callbackFinal.length)).toFixed(2);
	return avrg;
}

console.table(OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(arrToBeLooked, callbackFinalists) {
	
	
	initials = callbackFinalists(arrToBeLooked).map((finalists) => {
		if (finalists["Home Team Goals"] > finalists["Away Team Goals"]) {
			return finalists["Home Team Initials"]
		} else if (finalists["Home Team Goals"] < finalists["Away Team Goals"]) {
			return finalists["Away Team Initials"]
		}
	//	else if (finalists["Home Team Goals"] === finalists["Away Team Goals"])
	//}
	//let winnerbyPenalty = finalists["Win conditions"].split(" ")
	//return winnerbyPenalty[0];
	});
	const result = initials.reduce((winnerName, repeatTime) => {
		winnerName[repeatTime] = (winnerName[repeatTime] || 0) + 1;
		return winnerName;
	}, {})
return result;
}

console.log(UlkelerinKazanmaSayilari(fifaData, Finaller));
/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {

	/* kodlar buraya */

}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {

	/* kodlar buraya */

}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
	console.log('Kodlar çalışıyor');
	return 'as';
}
sa();
module.exports = {
	sa,
	Finaller,
	Yillar,
	Kazananlar,
	YillaraGoreKazananlar,
	OrtalamaGolSayisi
}
