import { Link } from "react-router-dom";
import {useState} from "react";
import { FaRegFileAlt } from "react-icons/fa";

const sections = [
  {
    title: "Бакалаврын сургалт зохион байгуулах журам",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/UFE-files/ERmR6HpBQqtKhMJwZulUh2IBHT8gAtr5ga0g1psnYDyakQ?e=mP6LWS",
    badge: "Журам",
  },
  {
    title: "Оюутны хөгжлийн бодлого батлах тухай",
    desc: "Сургалтын болон бусад үйл ажиллагаагаар оюутны хөгжлийг дэмжих",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F01%2E%20%D0%9E%D1%8E%D1%83%D1%82%D0%BD%D1%8B%20%D1%85%D3%A9%D0%B3%D0%B6%D0%BB%D0%B8%D0%B9%D0%BD%20%D0%B1%D0%BE%D0%B4%D0%BB%D0%BE%D0%B3%D0%BE%20%D0%B1%D0%B0%D1%82%D0%BB%D0%B0%D1%85%20%D1%82%D1%83%D1%85%D0%B0%D0%B9%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Бодлого",
  },
  {
    title: "Оюутны ёс зүйн дүрэм",
    desc: "Оюутны баримтлах ёс зүйн үндсэн зарчим",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F02%2E%20%D0%A1%D0%AD%D0%97%D0%98%D0%A1%2D%D0%B8%D0%B9%D0%BD%20%D0%9E%D1%8E%D1%83%D1%82%D0%BD%D1%8B%20%D1%91%D1%81%20%D0%B7%D2%AF%D0%B9%D0%BD%20%D0%B4%D2%AF%D1%80%D1%8D%D0%BC%20%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Дүрэм",
  },
  {
    title: "Оюутны ёс зүйн дүрмийн хавсралт",
    desc: "Оюутны баримтлах ёс зүйн үндсэн зарчим",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F03%2E%20%D0%9E%D1%8E%D1%83%D1%82%D0%BD%D1%8B%20%D1%91%D1%81%20%D0%B7%D2%AF%D0%B9%D0%BD%20%D0%B4%D2%AF%D1%80%D0%BC%D0%B8%D0%B9%D0%BD%20%D1%85%D0%B0%D0%B2%D1%81%D1%80%D0%B0%D0%BB%D1%82%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Хавсралт",
  },
  {
    title: "Оюутны сайн дурын ажил гүйцэтгэх журам",
    desc: "Сайн дурын ажилд оюутнуудыг татан оролцуулах, дэмжлэг үзүүлэх",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F04%2E%20%D0%9E%D1%8E%D1%83%D1%82%D0%BD%D1%8B%20%D1%81%D0%B0%D0%B9%D0%BD%20%D0%B4%D1%83%D1%80%D1%8B%D0%BD%20%D0%B0%D0%B6%D0%B8%D0%BB%20%D0%B3%D2%AF%D0%B9%D1%86%D1%8D%D1%82%D0%B3%D1%8D%D1%85%20%D0%B6%D1%83%D1%80%D0%B0%D0%BC%20%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Журам",
  },
  {
    title: "Англи хэлний хос болон хавсарга хөтөлбөрт дүн дүйцүүлэх удирдамж",
    desc: "",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F05%2E%20%D0%90%D0%BD%D0%B3%D0%BB%D0%B8%20%D1%85%D1%8D%D0%BB%D0%BD%D0%B8%D0%B9%20%D1%85%D0%BE%D1%81%20%D0%B1%D0%BE%D0%BB%D0%BE%D0%BD%20%D1%85%D0%B0%D0%B2%D1%81%D0%B0%D1%80%D0%B3%D0%B0%20%D1%85%D3%A9%D1%82%D3%A9%D0%BB%D0%B1%D3%A9%D1%80%D1%82%20%D0%B4%D2%AF%D0%BD%20%D0%B4%D2%AF%D0%B9%D1%86%D2%AF%D2%AF%D0%BB%D1%8D%D1%85%20%D1%83%D0%B4%D0%B8%D1%80%D0%B4%D0%B0%D0%BC%D0%B6%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Удирдамж",
  },
  {
    title: " Академик англи хэлний А1, А2 түвшний сургалтын хөтөлбөр хэрэгжүүлэх журам",
    desc: "",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F06%2E%20%D0%90%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D0%B8%D0%BA%20%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%20%D1%85%D1%8D%D0%BB%D0%BD%D0%B8%D0%B9%20%D0%901%2C%20%D0%902%20%D1%82%D2%AF%D0%B2%D1%88%D0%BD%D0%B8%D0%B9%20%D1%81%D1%83%D1%80%D0%B3%D0%B0%D0%BB%D1%82%D1%8B%D0%BD%20%D1%85%D3%A9%D1%82%D3%A9%D0%BB%D0%B1%D3%A9%D1%80%20%D1%85%D1%8D%D1%80%D1%8D%D0%B3%D0%B6%D2%AF%D2%AF%D0%BB%D1%8D%D1%85%20%D0%B6%D1%83%D1%80%D0%B0%D0%BC%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Журам",
  },
  {
    title: "Англи хэлний түвшин тогтоох шалгалтын удирдамж",
    desc: "",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F07%2E%20%D0%90%D0%BD%D0%B3%D0%BB%D0%B8%20%D1%85%D1%8D%D0%BB%D0%BD%D0%B8%D0%B9%20%D1%82%D2%AF%D0%B2%D1%88%D0%B8%D0%BD%20%D1%82%D0%BE%D0%B3%D1%82%D0%BE%D0%BE%D1%85%20%D1%88%D0%B0%D0%BB%D0%B3%D0%B0%D0%BB%D1%82%D1%8B%D0%BD%20%D1%83%D0%B4%D0%B8%D1%80%D0%B4%D0%B0%D0%BC%D0%B6%202022%2D2023%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Удирдамж",
  },
  {
    title: "Гадаад хэлний институтээс зохион байгуулах сургалтын удирдамж",
    desc: "",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F08%2E%20%D0%93%D0%B0%D0%B4%D0%B0%D0%B0%D0%B4%20%D1%85%D1%8D%D0%BB%D0%BD%D0%B8%D0%B9%20%D0%B8%D0%BD%D1%81%D1%82%D0%B8%D1%82%D1%83%D1%82%D1%8D%D1%8D%D1%81%20%D0%B7%D0%BE%D1%85%D0%B8%D0%BE%D0%BD%20%D0%B1%D0%B0%D0%B9%D0%B3%D1%83%D1%83%D0%BB%D0%B0%D1%85%20%D1%81%D1%83%D1%80%D0%B3%D0%B0%D0%BB%D1%82%D1%8B%D0%BD%20%D1%83%D0%B4%D0%B8%D1%80%D0%B4%D0%B0%D0%BC%D0%B6%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Удирдамж",
  },
  {
    title: "СЭЗИС-ийн бакалаврын хөтөлбөрийн мэргэжлийн чиглэлийн амжилт гаргасан шагнах удирмш урамшуулал тухай",
    desc: "",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F09%2E%20%D0%A1%D0%AD%D0%97%D0%98%D0%A1%2D%D0%B8%D0%B9%D0%BD%20%D0%B1%D0%B0%D0%BA%D0%B0%D0%BB%D0%B0%D0%B2%D1%80%D1%8B%D0%BD%20%D1%85%D3%A9%D1%82%D3%A9%D0%BB%D0%B1%D3%A9%D1%80%D0%B8%D0%B9%D0%BD%20%D0%BC%D1%8D%D1%80%D0%B3%D1%8D%D0%B6%D0%BB%D0%B8%D0%B9%D0%BD%20%D1%87%D0%B8%D0%B3%D0%BB%D1%8D%D0%BB%D1%8D%D1%8D%D1%80%20%D0%B0%D0%BC%D0%B6%D0%B8%D0%BB%D1%82%20%D0%B3%D0%B0%D1%80%D0%B3%D0%B0%D1%81%D0%B0%D0%BD%20%D0%BE%D1%8E%D1%83%D1%82%D0%BD%D1%8B%D0%B3%20%D1%88%D0%B0%D0%B3%D0%BD%D0%B0%D0%B6%20%D1%83%D1%80%D0%B0%D0%BC%D1%88%D1%83%D1%83%D0%BB%D0%B0%D1%85%20%D1%82%D1%83%D1%85%D0%B0%D0%B9%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "",
  },
  {
    title: "Хөгжлийн семинарын удирдамж",
    desc: "",
    to: "https://ufenu.sharepoint.com/:b:/s/UFE-files/ETYIaH-OpOVMnnqK73j5GK0Bni8QZWv2lGaa2GAGN14fpQ?e=avhnBr",
    badge: "Удирдамж",
  },
  {
    title: "СЭЗИС-ийн бакалаврын зэрэг олгох хөтөлбөрийн шилжилт хөдөлгөөний журмыг шинэчлэн батлах тухай",
    desc: "",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F11%2E%20%D0%A1%D0%AD%D0%97%D0%98%D0%A1%2D%D0%B8%D0%B9%D0%BD%20%D0%91%D0%B0%D0%BA%D0%B0%D0%BB%D0%B0%D0%B2%D1%80%D1%8B%D0%BD%20%D0%B7%D1%8D%D1%80%D1%8D%D0%B3%20%D0%BE%D0%BB%D0%B3%D0%BE%D1%85%20%D1%85%D3%A9%D1%82%D3%A9%D0%BB%D0%B1%D3%A9%D1%80%D0%B8%D0%B9%D0%BD%20%D1%88%D0%B8%D0%BB%D0%B6%D0%B8%D0%BB%D1%82%20%D1%85%D3%A9%D0%B4%D3%A9%D0%BB%D0%B3%D3%A9%D3%A9%D0%BD%D0%B8%D0%B9%20%D0%B6%D1%83%D1%80%D0%BC%D1%8B%D0%B3%20%D1%88%D0%B8%D0%BD%D1%8D%D1%87%D0%BB%D1%8D%D0%BD%20%D0%B1%D0%B0%D1%82%D0%BB%D0%B0%D1%85%20%20%D1%82%D1%83%D1%85%D0%B0%D0%B9%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Журам",
  },
  {
    title: "Нийгмийн дадлага удирдамж",
    desc: "",
    to: "https://ufenu.sharepoint.com/:b:/s/UFE-files/EQQA5iWF5slDvm7rJ6gIFOEBYFjjN95mF2ttfn6pUC1o5Q?e=6wiCfw",
    badge: "Удирдамж",
  },
  {
    title: "21-р зууний боловсрол-ур чадвар контент бүтээх нийгмийн дадлага удирдамж",
    desc: "",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F13%2E%2021%2D%D1%80%20%D0%B7%D1%83%D1%83%D0%BD%D1%8B%20%D0%B1%D0%BE%D0%BB%D0%BE%D0%B2%D1%81%D1%80%D0%BE%D0%BB%2D%D1%83%D1%80%20%D1%87%D0%B0%D0%B4%D0%B2%D0%B0%D1%80%20%20%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%BD%D1%82%20%D0%B1%D2%AF%D1%82%D1%8D%D1%8D%D1%85%20%D0%BD%D0%B8%D0%B9%D0%B3%D0%BC%D0%B8%D0%B9%D0%BD%20%D0%B4%D0%B0%D0%B4%D0%BB%D0%B0%D0%B3%D1%8B%D0%BD%20%D1%83%D0%B4%D0%B8%D1%80%D0%B4%D0%B0%D0%BC%D0%B6%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Удирдамж",
  },
  {
    title: "СЭЗИС-ийн Ректорын нэрэмжит тэтгэлэг олгoх тухай",
    desc: "",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F14%2E%20%D0%A1%D0%AD%D0%97%D0%98%D0%A1%2D%D0%B8%D0%B9%D0%BD%20%D0%A0%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D1%8B%D0%BD%20%D0%BD%D1%8D%D1%80%D1%8D%D0%BC%D0%B6%D0%B8%D1%82%20%D1%82%D1%8D%D1%82%D0%B3%D1%8D%D0%BB%D1%8D%D0%B3%20%D0%BE%D0%BB%D0%B3%D0%BE%D1%85%20%D1%82%D1%83%D1%85%D0%B0%D0%B9%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Удирдамж",
  },
  {
    title: "СЭЗИС-ийн Бакалаврын сургалтын улирлын эцсийн шалгалтын удирдамж",
    desc: "",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F15%2E%20%D0%A1%D0%AD%D0%97%D0%98%D0%A1%2D%D0%B8%D0%B9%D0%BD%20%D0%91%D0%B0%D0%BA%D0%B0%D0%BB%D0%B0%D0%B2%D1%80%D1%8B%D0%BD%20%D1%81%D1%83%D1%80%D0%B3%D0%B0%D0%BB%D1%82%D1%8B%D0%BD%20%D1%83%D0%BB%D0%B8%D1%80%D0%BB%D1%8B%D0%BD%20%D1%8D%D1%86%D1%81%D0%B8%D0%B9%D0%BD%20%D1%88%D0%B0%D0%BB%D0%B3%D0%B0%D0%BB%D1%82%D1%8B%D0%BD%20%D1%83%D0%B4%D0%B8%D1%80%D0%B4%D0%B0%D0%BC%D0%B6%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Удирдамж",
  },
  {
    title: "Нэгдсэн шалгалтын удирдамж",
    desc: "",
    to: "https://ufenu.sharepoint.com/:b:/s/UFE-files/IQDiYaVJ_RAtRZ1559QG_MWpATYO2tAUc6PpiAY7EIYTGbg?e=H8iyoF",
    badge: "Удирдамж",
  },
  {
    title: "СЭЗИС-ийн бакалаврын үндсэн болон ОУ-ын хөтөлбөрийн элсэгчдэд тэтгэлэг олгох журам",
    desc: "",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F17%2E%20%D0%A1%D0%AD%D0%97%D0%98%D0%A1%2D%D0%B8%D0%B9%D0%BD%20%D0%91%D0%B0%D0%BA%D0%B0%D0%BB%D0%B0%D0%B2%D1%80%D1%8B%D0%BD%20%D2%AF%D0%BD%D0%B4%D1%81%D1%8D%D0%BD%20%D0%B1%D0%BE%D0%BB%D0%BE%D0%BD%20%D0%9E%D0%A3%2D%D1%8B%D0%BD%20%D1%85%D3%A9%D1%82%D3%A9%D0%BB%D0%B1%D3%A9%D1%80%D0%B8%D0%B9%D0%BD%20%D1%8D%D0%BB%D1%81%D1%8D%D0%B3%D1%87%D0%B4%D1%8D%D0%B4%20%D1%82%D1%8D%D1%82%D0%B3%D1%8D%D0%BB%D1%8D%D0%B3%20%D0%BE%D0%BB%D0%B3%D0%BE%D1%85%20%D0%B6%D1%83%D1%80%D0%B0%D0%BC%202021%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Журам",
  },
  {
    title: "ART Badge хөтөлбөрийн удирдамж",
    desc: "",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F18%2E%20ART%20Badge%20%D1%85%D3%A9%D1%82%D3%A9%D0%BB%D0%B1%D3%A9%D1%80%D0%B8%D0%B9%D0%BD%20%D1%83%D0%B4%D0%B8%D1%80%D0%B4%D0%B0%D0%BC%D0%B6%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Удирдамж",
  },
  {
    title: "СЭЗИС-ийн оюутны байрны журам батлах тухай",
    desc: "",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F19%2E%20%D0%A1%D0%AD%D0%97%D0%98%D0%A1%2D%D0%B8%D0%B9%D0%BD%20%D0%9E%D1%8E%D1%83%D1%82%D0%BD%D1%8B%20%D0%B1%D0%B0%D0%B9%D1%80%D0%BD%D1%8B%20%D0%B6%D1%83%D1%80%D0%B0%D0%BC%20%D0%B1%D0%B0%D1%82%D0%BB%D0%B0%D1%85%20%D1%82%D1%83%D1%85%D0%B0%D0%B9%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Журам",
  },
  {
    title: "СЭЗИС-ийн Санал, Гомдол шийдвэрлэх журам батлах тухай",
    desc: "",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F20%2E%20%D0%A1%D0%AD%D0%97%D0%98%D0%A1%2D%D0%B8%D0%B9%D0%BD%20%D0%A1%D0%B0%D0%BD%D0%B0%D0%BB%2C%20%D0%B3%D0%BE%D0%BC%D0%B4%D0%BE%D0%BB%20%D1%88%D0%B8%D0%B9%D0%B4%D0%B2%D1%8D%D1%80%D0%BB%D1%8D%D1%85%20%D0%B6%D1%83%D1%80%D0%B0%D0%BC%20%D0%B1%D0%B0%D1%82%D0%BB%D0%B0%D1%85%20%D1%82%D1%83%D1%85%D0%B0%D0%B9%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Журам",
  },
  {
    title: "Бодлогын баримт бичиг",
    desc: "",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F21%2E%20%D0%90%20151%202022%2D08%2D25%20%D0%91%D0%BE%D0%B4%D0%BB%D0%BE%D0%B3%D1%8B%D0%BD%20%D0%B1%D0%B0%D1%80%D0%B8%D0%BC%D1%82%20%D0%B1%D0%B8%D1%87%D0%B8%D0%B3%20%D0%B1%D0%B0%D1%82%D0%BB%D0%B0%D1%85%20%D1%82%D1%83%D1%85%D0%B0%D0%B9%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Баримт бичиг",
  },
  {
    title: "Явцын шалгалтын удирдамж",
    desc: "",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F22%2E%20%D0%AF%D0%B2%D1%86%D1%8B%D0%BD%20%D1%88%D0%B0%D0%BB%D0%B3%D0%B0%D0%BB%D1%82%D1%8B%D0%BD%20%D1%83%D0%B4%D0%B8%D1%80%D0%B4%D0%B0%D0%BC%D0%B6%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Удирдамж",
  },
  {
    title: "Бакалаврын цагийн хөтөлбөрт сургалт зохион байгуулах журам батлах тухай",
    desc: "",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F%D0%90%20224%202022%2D11%2D22%20%D0%91%D0%B0%D0%BA%D0%B0%D0%BB%D0%B0%D0%B2%D1%80%D1%8B%D0%BD%20%D1%86%D0%B0%D0%B3%D0%B8%D0%B9%D0%BD%20%D1%85%D3%A9%D1%82%D3%A9%D0%BB%D0%B1%D3%A9%D1%80%D1%82%20%D1%81%D1%83%D1%80%D0%B3%D0%B0%D0%BB%D1%82%20%D0%B7%D0%BE%D1%85%D0%B8%D0%BE%D0%BD%20%D0%B1%D0%B0%D0%B9%D0%B3%D1%83%D1%83%D0%BB%D0%B0%D1%85%20%D0%B6%D1%83%D1%80%D0%B0%D0%BC%20%D0%B1%D0%B0%D1%82%D0%BB%D0%B0%D1%85%20%D1%82%D1%83%D1%85%D0%B0%D0%B9%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib",
    badge: "Журам",
  },
  {
    title: "СЭЗИС-ийн Ажлын байранд суурилсан сургалтын хөтөлбөрийг зохион байгуулах журам батлах тухай",
    desc: "",
    to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/Forms/All%20invoices.aspx?id=%2Fsites%2FUFE%2Dfiles%2FDocLib%2F%D0%90%2077%202024%2D03%2D20%20%D0%90%D0%B6%D0%BB%D1%8B%D0%BD%20%D0%B1%D0%B0%D0%B9%D1%80%D0%B0%D0%BD%D0%B4%20%D1%81%D1%83%D1%83%D1%80%D0%B8%D0%BB%D1%81%D0%B0%D0%BD%20%D0%B4%D0%B0%D0%B4%D0%BB%D0%B0%D0%B3%D0%B0%D0%B6%D0%B8%D1%85%20%D1%85%D3%A9%D1%82%D3%A9%D0%BB%D0%B1%D3%A9%D1%80%20%D0%B7%D0%BE%D1%85%D0%B8%D0%BE%D0%BD%20%D0%B1%D0%B0%D0%B9%D0%B3%D1%83%D1%83%D0%BB%D0%B0%D1%85%20%D0%B6%D1%83%D1%80%D0%B0%D0%BC%20%D1%88%D0%B8%D0%BD%D1%8D%D1%87%D0%BB%D1%8D%D0%BD%20%D0%B1%D0%B0%D1%82%D0%BB%D0%B0%D1%85%20%D1%82%D1%83%D1%85%D0%B0%D0%B9%2Epdf&parent=%2Fsites%2FUFE%2Dfiles%2FDocLib&p=true&ga=1",
    badge: "Журам",
  },
];

export default function Rules() {
  const [search, setSearch] = useState("");

  // Ensure sections is always an array
  const filteredSections = (sections || []).filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 py-0 mx-auto space-y-6 max-w-7xl">
      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Хайх…"
          className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
        />
      </div>

      {/* Grid of sections */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSections.length === 0 && (
          <p className="text-gray-500 col-span-full">Хайсан зүйл олдсонгүй.</p>
        )}

        {filteredSections.map((s, i) => (
          <Link
            key={i}
            to={s.to}
            className="p-4 transition bg-white border border-gray-200 shadow-sm group rounded-xl hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {/* Badge with optional icon */}
            <span className="inline-flex items-center gap-1 px-3 py-1 mb-3 text-sm font-medium text-blue-700 rounded-full bg-blue-50">
              <FaRegFileAlt className="text-sm text-blue-500" /> {s.badge}
            </span>

            {/* Title */}
            <h3 className="mb-2 text-lg font-semibold text-gray-800 group-hover:text-blue-700">
              {s.title}
            </h3>


            {/* Action hint */}
            <div className="flex items-center mt-4 text-sm font-medium text-blue-600">
              Дэлгэрэнгүй
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}