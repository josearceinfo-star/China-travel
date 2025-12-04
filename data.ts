import { Factory, Region, TravelRoute } from './types';

export const FACTORIES: Factory[] = [
  {
    id: 1,
    name: "KONBUILD",
    region: Region.Guangdong,
    city: "Foshan",
    fullAddress: "A9005-008, 9th Floor, Building A, #189 Foshan Main Road Central, Chancheng District, Foshan, Guangdong",
    coords: [23.0356, 113.1219],
    contact: "+86 13924859314",
    accommodation: ["Crowne Plaza Foshan (1.5 km)", "Vienna Hotel Foshan Zumiao (2 km)"],
    notes: "Ubicado en el centro de Foshan, fácil acceso por metro Línea 1 (Estación Zumiao). Nicho lujo.",
    priority: 7,
    distanceInfo: "Desde Aeropuerto Guangzhou Baiyun: 35 km, 45 min en auto",
    type: 'Office',
    website: "https://www.konbuild.com"
  },
  {
    id: 2,
    name: "K-HOME CHINA",
    region: Region.Henan,
    city: "Xinxiang",
    fullAddress: "No.169 Huagong Road, Guangcai Market, Xinxiang City, Henan Province, 453000",
    coords: [35.3075, 113.9268],
    contact: "+86 13912744577",
    accommodation: ["Xinxiang International Hotel (3 km)", "Hanting Hotel Xinxiang (2.5 km)"],
    notes: "Zona industrial, coordinar visita con anticipación. Tienen 3 plantas de producción. 70% del mercado.",
    priority: 3,
    distanceInfo: "Desde Aeropuerto Zhengzhou Xinzheng: 75 km, 1 hora en auto",
    type: 'Factory',
    website: "https://www.khomechina.com"
  },
  {
    id: 3,
    name: "ZN HOUSE",
    region: Region.Jiangsu,
    city: "Suzhou",
    fullAddress: "No. 2, Xiaoping Road, Badu Community, Zhenze Town, Wujiang District, Suzhou",
    coords: [31.1619, 120.3851],
    contact: "+86 13912744577",
    accommodation: ["Atour Hotel Suzhou Industrial Park (15 km)", "Shangri-La Hotel Suzhou (20 km)"],
    notes: "Ubicado en zona rural de Wujiang, mejor ir en taxi/auto privado. Tecnología moderna.",
    priority: 6,
    distanceInfo: "Desde Centro Suzhou: 35 km, 40 min en auto",
    type: 'Factory',
    website: "https://www.znhouse.com"
  },
  {
    id: 4,
    name: "GS HOUSING",
    region: Region.Guangdong,
    city: "Foshan",
    fullAddress: "No. 540, Genghe Avenue, Genghe Town, Gaoming District, Foshan",
    coords: [22.9520, 112.9850],
    accommodation: ["Foshan Marriott Hotel (zona Nanhai)", "Holiday Inn Foshan"],
    notes: "Esta es la más grande (110,000 m²). También tienen plantas en Tianjin y Shenyang. Mayor capacidad China.",
    priority: 1,
    distanceInfo: "Desde Centro Foshan: 25 km, 35 min",
    type: 'Factory',
    website: "https://www.gshousing.com.cn"
  },
  {
    id: 5,
    name: "GUANGDONG C.BOX",
    region: Region.Guangdong,
    city: "Foshan (Shunde)",
    fullAddress: "No. 6, Xinyue Road, Wusha Community, Daliang Subdistrict, Shunde District, Foshan",
    coords: [22.8053, 113.2934],
    accommodation: ["Le Meridien Shunde (5 km)", "Vienna Hotel Shunde (3 km)"],
    notes: "La fábrica más grande de todas. Tiene 30 plantas de producción. Más grande, mejor precio.",
    priority: 2,
    distanceInfo: "Desde Guangzhou: 45 km, 50 min. Desde Centro Foshan: 20 km, 25 min",
    type: 'Factory',
    website: "https://www.cboxhouse.com"
  },
  {
    id: 6,
    name: "CGCH (GREEN CONTAINER)",
    region: Region.Guangdong,
    city: "Guangzhou/Foshan",
    fullAddress: "9th Floor, No. 622, Huangpu Avenue, Tianhe District, Guangzhou (Oficina)",
    coords: [23.1291, 113.2644],
    accommodation: ["The Garden Hotel Guangzhou (2 km de oficina)", "Holiday Inn Express Guangzhou"],
    notes: "Recomiendo visitar oficina en Guangzhou primero, ellos coordinan visita a fábricas. Innovación y patentes.",
    priority: 5,
    distanceInfo: "Desde Aeropuerto Guangzhou: 28 km, 35 min",
    type: 'Office',
    website: "https://www.cgchcontainer.com"
  },
  {
    id: 7,
    name: "WIDE HZ",
    region: Region.Shandong,
    city: "Weifang",
    fullAddress: "Zona Industrial Weifang City, Shandong Province (Confirmar exacta)",
    coords: [36.7069, 119.1019],
    accommodation: ["Weifang International Hotel", "Vienna Hotel Weifang"],
    notes: "Empresa más reciente (2020). Especialidad: diseños innovadores.",
    priority: 9,
    distanceInfo: "Desde Aeropuerto Weifang: 15-20 km",
    type: 'Factory',
    website: "https://www.widehz.com"
  },
  {
    id: 8,
    name: "SHANDONG QUALITY",
    region: Region.Shandong,
    city: "Weifang",
    fullAddress: "Room 1-2-1611, Danguili Commercial Street, Kuiwen District, Weifang",
    coords: [36.7167, 119.1425],
    accommodation: ["Weifang International Hotel (1 km)", "Hanting Hotel Weifang"],
    notes: "Ubicación céntrica en Weifang. Puede servir como base para visitar WIDE HZ también.",
    priority: 8,
    distanceInfo: "Desde Centro Weifang: 5 km, 10 min",
    type: 'Office',
    website: "https://www.sdintegratedhouse.com"
  },
  {
    id: 9,
    name: "JJC HOUSES",
    region: Region.Guangdong,
    city: "Guangzhou",
    fullAddress: "Room 618, Huagang Commercial Building, No. 140, Zhongshan Dadao, Tianhe District",
    coords: [23.1353, 113.3237],
    accommodation: ["Four Seasons Hotel Guangzhou (3 km)", "Hilton Guangzhou Tianhe (2 km)"],
    notes: "Oficina comercial en Guangzhou. Exhiben en Canton Fair.",
    priority: 10,
    distanceInfo: "Desde Aeropuerto: 32 km, 40 min",
    type: 'Office',
    website: "https://www.jjchouses.com"
  },
  {
    id: 10,
    name: "TD CONTAINER HOUSE",
    region: Region.Jiangsu,
    city: "Suzhou",
    fullAddress: "7th Floor, Building C, No. 99 Yangchenghu Road, Xiangcheng District, Suzhou",
    coords: [31.3672, 120.5953],
    contact: "+86 150 6221 2076",
    accommodation: ["Shangri-La Hotel Suzhou (8 km)", "Atour Hotel Suzhou"],
    notes: "20+ años de experiencia. Clientes Fortune 500. Experiencia y calidad.",
    priority: 4,
    distanceInfo: "Metro Suzhou: Línea 2",
    type: 'Office',
    website: "https://www.tdcontainer.com"
  },
  {
    id: 11,
    name: "WELLCAMP",
    region: Region.Guangdong,
    city: "Zhaoqing",
    fullAddress: "No. 7, Wende 4th Street, Dawang High-Tech Zone, Zhaoqing, Guangdong",
    coords: [23.3440, 112.8330],
    contact: "Confirmar contacto oficial",
    accommodation: ["Vienna Int. Hotel Zhaoqing Dawang (3 km)", "City Comfort Inn (2.5 km)"],
    notes: "Ubicados en zona tecnológica de Zhaoqing. Especialistas en estructuras prefabricadas.",
    priority: 6,
    distanceInfo: "Desde Guangzhou: 60 km, 50 min en auto",
    type: 'Factory',
    website: "https://www.wellcamp.cn"
  },
  {
    id: 12,
    name: "XINYU",
    region: Region.Shandong,
    city: "Jinan",
    fullAddress: "Room 1301-104, Xicheng Huijin Financial Center, No 6 Fuxing Road, Xingfu Subdistrict, Huaiyin District, Jinan City, Shandong",
    coords: [36.6660, 116.8980],
    contact: "Confirmar contacto oficial",
    accommodation: ["Melia Jinan (2 km)", "Grand Mercure Jinan Sunshine (3 km)"],
    notes: "Oficina en el centro financiero de Jinan (Capital de Shandong). Parada estratégica entre el centro y la costa.",
    priority: 8,
    distanceInfo: "Desde Estación Jinan West: 5 km (15 min). Aeropuerto Jinan: 45 min.",
    type: 'Office',
    website: "https://www.xinyuprefab.com"
  }
];

export const ROUTES: TravelRoute[] = [
  {
    id: "r1",
    name: "Ruta Maestra: Norte a Sur",
    duration: "9 Días / 8 Noches",
    description: "La ruta óptima para visitar las 7 fábricas prioritarias, minimizando tiempos de traslado y cubriendo Shandong, Henan y Guangdong.",
    totalDistance: "~2,200 km",
    steps: [
      { 
        day: 1, 
        city: "Jinan (Shandong)", 
        activity: "Llegada a Jinan y visita inicial.", 
        factoriesToVisit: [12],
        travelMode: 'Plane',
        travelDetails: "Vuelo a Aeropuerto Jinan (TNA)",
        accommodationTarget: "Melia Jinan o Grand Mercure",
        dailyTip: "Llegar antes del mediodía para aprovechar la visita a Xinyu el mismo día."
      },
      { 
        day: 2, 
        city: "Jinan -> Xinxiang", 
        activity: "Traslado temprano y visita intensiva a K-Home.", 
        factoriesToVisit: [2],
        travelMode: 'Train',
        travelDetails: "Tren Alta Velocidad Jinan West -> Xinxiang East (aprox. 2.5h)",
        accommodationTarget: "Xinxiang International Hotel",
        dailyTip: "Coordinar recogida en estación con K-Home previamente."
      },
      { 
        day: 3, 
        city: "Xinxiang -> Guangzhou", 
        activity: "Día de traslado estratégico Norte-Sur.", 
        factoriesToVisit: [],
        travelMode: 'Plane',
        travelDetails: "Tren a Zhengzhou (30min) + Vuelo a Guangzhou (2.5h)",
        accommodationTarget: "Hotel cerca de Aeropuerto Guangzhou o ruta a Zhaoqing",
        dailyTip: "Descanso. Preparar documentos para la fase intensa en el sur."
      },
      { 
        day: 4, 
        city: "Guangzhou -> Zhaoqing", 
        activity: "Traslado a Zhaoqing y visita Wellcamp.", 
        factoriesToVisit: [11],
        travelMode: 'Car',
        travelDetails: "Auto privado/Didi desde Guangzhou (aprox 1h)",
        accommodationTarget: "Vienna Int. Hotel Zhaoqing",
        dailyTip: "Wellcamp está en zona High-Tech, pedir ubicación exacta por WeChat."
      },
      { 
        day: 5, 
        city: "Zhaoqing -> Foshan (Gaoming)", 
        activity: "Visita a la mega-fábrica de GS Housing.", 
        factoriesToVisit: [4],
        travelMode: 'Car',
        travelDetails: "Traslado terrestre hacia distrito Gaoming (45 min)",
        accommodationTarget: "Foshan Marriott Hotel",
        dailyTip: "GS Housing es enorme (110k m²), usar calzado muy cómodo."
      },
      { 
        day: 6, 
        city: "Foshan (Shunde)", 
        activity: "Día de Cluster en Shunde: C.BOX y Konbuild.", 
        factoriesToVisit: [5, 1],
        travelMode: 'Car',
        travelDetails: "Movilidad local en Foshan",
        accommodationTarget: "Crowne Plaza Foshan",
        dailyTip: "Shunde es la capital gastronómica. Aprovechar la cena aquí."
      },
      { 
        day: 7, 
        city: "Foshan -> Guangzhou", 
        activity: "Visita final a CGCH y cierre de negocios.", 
        factoriesToVisit: [6],
        travelMode: 'Car',
        travelDetails: "Regreso a distrito Tianhe, Guangzhou (40 min)",
        accommodationTarget: "The Garden Hotel Guangzhou",
        dailyTip: "Ideal para tener la última reunión de cierre en sus oficinas corporativas."
      },
      {
         day: 8,
         city: "Guangzhou",
         activity: "Día libre / Compras / Canton Fair (si coincide)",
         factoriesToVisit: [],
         travelMode: 'None',
         accommodationTarget: "The Garden Hotel Guangzhou",
         dailyTip: "Visitar el distrito de Pazhou o disfrutar del Pearl River Night Cruise."
      }
    ]
  }
];
