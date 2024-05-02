import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
  useMediaQuery,
  Modal,
} from "@mui/material";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import EventIcon from "@mui/icons-material/Event";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import PhoneInput from "react-phone-input-2";
// import 'react-phone-input-2/lib/style.css';
import { OpenInNew } from "@mui/icons-material";
import { De, Es, Fr, Gb, Pt } from "react-flags-select";
import "react-phone-input-2/lib/material.css";

import i18n from "i18next";
// import Link from "next/link";
import { initReactI18next, useTranslation } from "react-i18next";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import moment from "moment/moment";
import { Informations } from "@/Components/Informations";
import Conditions from "./conditions";
import CloseIcon from "@mui/icons-material/Close";

i18n.use(initReactI18next).init({
  lng: "fr",
  resources: {
    en: {
      translation: {
        calendar: {
          weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          months: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        couverts: {
          one: "Couvert",
          other: "Couverts",
        },

        Votreréservation: "Your reservation",
        merci:
          "Please confirm your reservation 24 hours in advance or risk having it canceled",
        Contact: "Contact",
        Madame: " Madam",
        Monsieur: "Sir",
        PRÉNOM: "FIRST NAME",
        NOM: "LAST NAME",
        TÉLÉPHONE: "PHONE",
        EMAIL: "E-MAIL",
        commentaires: "COMMENTS ON ALLERGIES AND FOOD HABITS optional",
        enregistrer: "Save this information to facilitate my next reservations",
        accepter: "I accept the general conditions of use of the service",
        souhaite1:
          " I would like to receive news and restaurant programming by email",
        souhaite2:
          "I would like to receive news and restaurant schedules by SMS",
        Réserver: "To book",
        comment: "Your comment....",
        error: "Please complete all required fields",
        paragraph:
          "The restaurant with which you are making your reservation or order collects and processes your personal data for the purpose of managing and monitoring your request and responses to it, including communications sent to you by email or SMS related to your reservation (receipt of your request, confirmation of reservation, etc.), possibly in conjunction with Zenchef, which provides the restaurant with a reservation and order management tool. Furthermore, the restaurant collects and processes your personal data more generally for the purpose of managing and monitoring its relationship with you, particularly for conducting marketing activities directed at you, across all media, especially by phone, email, or SMS. Regarding the aforementioned processing, you have, under the conditions defined by applicable provisions, the right to access your data, rectify, erase, and port your data, as well as the right to obtain restriction of processing of said data and the right to object to the processing of your data. It should be noted that you have, in any case, the right to object to marketing at any time without having to provide a reason or explanation, or, if the processing of your data is based on obtaining your consent, the right to withdraw it. You also have the right to set directives regarding the fate of your personal data and how you wish your rights to be exercised after your death. Finally, you have the opportunity to file a complaint with a competent supervisory authority if you believe that your data is being processed in non-compliance with applicable provisions. Moreover, it is specified that under Articles L.223-1 and following of the Consumer Code, if you are a consumer, you can at any time oppose being contacted by phone by registering for free on the website www.bloctel.gouv.fr. To learn more about the processing of your personal data implemented by the restaurant as joint controller of processing with Zenchef and to exercise your rights regarding these processes, you can consult Zenchef's personal data protection policy. To learn more about the processing of your personal data implemented by the restaurant as the sole controller of processing and to exercise your rights regarding these processes, you should approach the restaurant or consult its online data protection policy on its website if applicable.",
        pageTitle: "Welcome",
        notAvailableMessage:
          "If the time you want is not available, feel free to search for another date or call us at .",
        Horaires: "Schedules",
        petitDejeuner: "Breakfast",
        dejeuner: "Lunch",
        diner: "Dinner",
        reserver: "Book",
        notification: " is the limit of reservation online",
      },
    },
    fr: {
      translation: {
        calendar: {
          weekdays: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
          months: [
            "Janvier",
            "février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre",
          ],
        },
        couverts: {
          one: "Couvert",
          other: "Couverts",
        },

        Votreréservation: "Votre réservation",
        merci:
          "Merci de confirmer votre réservation 24 heures avant,au risque de la voir annulée",
        Contact: "Contact",
        Madame: " Madame",
        Monsieur: "Monsieur",
        PRÉNOM: "PRÉNOM",
        NOM: "NOM",
        TÉLÉPHONE: "TÉLÉPHONE",
        EMAIL: "EMAIL",
        commentaires:
          "COMMENTAIRES, ALLERGIES ET HABITUDES ALIMENTAIRES(facultatif)",
        enregistrer:
          "Enregistrer ces informations pour faciliter mes prochaines réservations",
        accepter: "J'accepte les conditions générales d'utilisation du service",
        souhaite1: "Réserver maintenant",
        souhaite2:
          "Je souhaite recevoir les actualités et programmation du restaurant par SMS",
        Réserver: "Réserver",
        comment: "Votre commentaire ....",
        error: "Veuillez remplir les champs obligatoires",
        paragraph:
          "Le restaurant auprès duquel vous effectuez votre demande de réservation ou de commande collecte traite vos données à caractèrepersonnel aux fins de gestion et de suivi de votre demande et desréponses à y apporter, y compris s’agissant des communications quivous sont adressées par email ou SMS en lien avec votreréservation (accusé de réception de votre demande, confirmation deréservation,…), et ce éventuellement conjointement avec Zenchefqui met à disposition du restaurant un outil de gestion de sesréservations et commandes. Par ailleurs, le restaurant collecte ettraite vos données à caractère personnel plus généralement auxfins de gestion et de suivi de ses relations avec vous, etnotamment pour la réalisation d’opérations de prospection à votreattention, sur tous supports, et en particulier par téléphone, paremail ou par SMS. S’agissant des traitements susvisés, vousbénéficiez, dans les conditions définies par les dispositionsapplicables, d’un droit d’accès à vos données, de rectification,d’effacement et de portabilité de vos données, ainsi que du droitd’obtenir la limitation du traitement desdites données et d’undroit d’opposition au traitement de vos données, étant précisé quevous disposez en tout état de cause du droit de vous opposer àtoute prospection à tout moment sans avoir à fournir de motif oud’explication, ou encore, si le traitement de vos données estfondé sur l’obtention de votre consentement, du droit de leretirer. Vous disposez également du droit de définir des        directives relatives au sort de vos données à caractère personnelet à la manière dont vous souhaitez que vos droits soient exercésaprès votre décès. Vous disposez enfin de la possibilitéd’introduire une réclamation auprès d’une autorité de contrôlecompétente si vous estimez que vos données font l’objet d’untraitement non-conforme aux dispositions applicables. En outre, ilest précisé qu’en application des articles L.223-1 et suivants duCode de la consommation, vous pouvez, si vous êtes unconsommateur, vous s’opposer à tout moment à être démarché partéléphone, en vous inscrivant gratuitement sur le sitewww.bloctel.gouv.fr. Pour en savoir plus s’agissant destraitements de vos données à caractère personnel mis en œuvre parle restaurant en qualité de responsable conjoint de traitementavec Zenchef et pour exercer vos droits s’agissant de cestraitements, vous pouvez consulter la politique de protection desdonnées à caractère personnel de Zenchef. Pour en savoir pluss’agissant des traitements de vos données à caractère personnelmis en œuvre par le restaurant en tant que seul responsable detraitement et pour exercer vos droits s’agissant de cestraitements, il vous appartient de vous rapprocher du restaurantou de consulter sa politique de protection des données en ligne sur son site internet le cas échéant",

        pageTitle: "Bienvenue",
        notAvailableMessage:
          "Si l'horaire que vous souhaitez n'est pas disponible, n'hésitez pas à chercher à une autre date ou à nous contacter par téléphone au .",
        Horaires: "Horaires",
        petitDejeuner: "Petit Déjeuner",
        dejeuner: "Déjeuner",
        diner: "Dîner",
        reserver: "Réserver",
        notification: " est la limite de réservation en ligne",
      },
    },

    es: {
      translation: {
        calendar: {
          weekdays: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
          months: [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre",
          ],
        },
        couverts: {
          one: "Cubierto",
          other: "Cubiertos",
        },
        pageTitle: "Bienvenido",
        notAvailableMessage:
          "Si el horario que desea no está disponible, no dude en buscar otra fecha o llamarnos al 01 47 05 86 89.",
        Horaires: "Horarios",
        petitDejeuner: "Desayuno",
        dejeuner: "Almuerzo",
        diner: "Cena",
        reserver: "Reservar",
        notification: "es el límite de reserva en línea ",
        ParisEvents: "ParisEventos",
        Votreréservation: "Sua reserva",
        merci:
          "Por favor, confirme sua reserva com 24 horas de antecedência ou corre o risco de cancelá-la",
        Contact: "Contato",
        Madame: "Senhora",
        Monsieur: "Senhor",
        PRÉNOM: "PRIMEIRO NOME",
        NOM: "NOME",
        TÉLÉPHONE: "TELEFONE",
        EMAIL: "E-MAIL",
        commentaires:
          "COMENTÁRIOS SOBRE ALERGIAS E HÁBITOS ALIMENTARES opcionais",
        enregistrer:
          "Salve essas informações para facilitar minhas próximas reservas",
        accepter: "Aceito as condições gerais de utilização do serviço",
        souhaite1:
          "Desejo receber novidades e programação de restaurantes por email",
        souhaite2: "Desejo receber notícias e horários de restaurantes por SMS",
        Réserver: "agendar",
        comment: "Seu comentário",
        error: "Por favor, preencha todos os campos obrigatórios",
        paragraph:
          "O restaurante no qual você faz sua solicitação de reserva ou pedido coleta e trata seus dados pessoais para fins de gestão e acompanhamento de sua solicitação e das respostas a serem fornecidas, incluindo as comunicações que lhe são enviadas por email ou SMS em relação à sua reserva (recebimento de sua solicitação, confirmação de reserva, etc.), possivelmente em conjunto com a Zenchef, que fornece ao restaurante uma ferramenta de gestão de suas reservas e pedidos. Além disso, o restaurante coleta e processa seus dados pessoais de forma mais geral para fins de gestão e acompanhamento de suas relações com você, e especialmente para a realização de operações de prospecção dirigidas a você, em todos os meios, e em particular por telefone, por email ou por SMS. Quanto aos tratamentos mencionados, você tem, nas condições definidas pelas disposições aplicáveis, o direito de acesso aos seus dados, de retificação, de apagamento e de portabilidade dos seus dados, bem como o direito de obter a limitação do tratamento desses dados e o direito de se opor ao tratamento dos seus dados, sendo especificado que você tem, em qualquer caso, o direito de se opor a qualquer prospecção a qualquer momento sem ter que fornecer motivo ou explicação, ou ainda, se o tratamento dos seus dados for baseado na obtenção do seu consentimento, o direito de retirá-lo. Você também tem o direito de definir diretrizes relativas ao destino dos seus dados pessoais e à maneira como deseja que seus direitos sejam exercidos após sua morte. Finalmente, você tem a possibilidade de apresentar uma reclamação a uma autoridade de controle competente se considerar que seus dados estão sendo tratados de forma não conforme com as disposições aplicáveis. Além disso, é especificado que, em aplicação dos artigos L.223-1 e seguintes do Código do Consumidor, você pode, se for um consumidor, opor-se a qualquer momento a ser contatado por telefone, inscrevendo-se gratuitamente no site www.bloctel.gouv.fr. Para saber mais sobre os tratamentos dos seus dados pessoais realizados pelo restaurante como responsável conjunto pelo tratamento com a Zenchef e para exercer seus direitos sobre esses tratamentos, você pode consultar a política de proteção de dados pessoais da Zenchef. Para saber mais sobre os tratamentos dos seus dados pessoais realizados pelo restaurante como único responsável pelo tratamento e para exercer seus direitos sobre esses tratamentos, cabe a você aproximar-se do restaurante ou consultar sua política de proteção de dados online em seu site, se aplicável.",
      },
    },
    de: {
      //german
      translation: {
        calendar: {
          weekdays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
          months: [
            "Januar",
            "Februar",
            "März",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Dezember",
          ],
        },
        couverts: {
          one: "Gedeck",
          other: "Gedecke",
        },
        pageTitle: "Willkommen",
        notAvailableMessage:
          "Wenn die von Ihnen gewünschte Zeit nicht verfügbar ist, suchen Sie bitte nach einem anderen Datum oder rufen Sie uns unter  an.",
        Horaires: "Öffnungszeiten",
        petitDejeuner: "Frühstück",
        dejeuner: "Mittagessen",
        diner: "Abendessen",
        reserver: "Buchen",
        notification: "st die Grenze der Online-Reservierung",
        ParisEvents: "ParisEvents",
        Votreréservation: "Deine Reservierung",
        merci:
          "Bitte bestätigen Sie Ihre Reservierung 24 Stunden im Voraus, sonst riskieren Sie, dass sie storniert wird",
        Contact: "Kontakt",
        Madame: "gnädige Frau",
        Monsieur: "Herr",
        PRÉNOM: "VORNAME",
        NOM: "NAME",
        TÉLÉPHONE: "TELEFON",
        EMAIL: "EMAIL",
        commentaires:
          "Kommentare zu Allergien und Ernährungsgewohnheiten optional",
        enregistrer:
          "Speichern Sie diese Informationen, um meine nächsten Reservierungen zu erleichtern",
        accepter:
          "Ich akzeptiere die allgemeinen Nutzungsbedingungen des Dienstes",
        souhaite1:
          "Ich möchte Neuigkeiten und Restaurantprogramme per E-Mail erhalten",
        souhaite2:
          "Ich möchte Neuigkeiten und Restaurantpläne per SMS erhalten",
        Réserver: "buchen",
        comment: "Dein Kommentar",
        error: "Bitte füllen Sie alle Pflichtfelder aus",
        paragraph:
          "Das Restaurant, bei dem Sie Ihre Reservierung oder Bestellung vornehmen, sammelt und verarbeitet Ihre personenbezogenen Daten zum Zweck der Verwaltung und Nachverfolgung Ihrer Anfrage und der darauf zu gebenden Antworten, einschließlich der Kommunikation, die Ihnen per E-Mail oder SMS im Zusammenhang mit Ihrer Reservierung zugesandt wird (Empfangsbestätigung Ihrer Anfrage, Bestätigung der Reservierung usw.), gegebenenfalls in Zusammenarbeit mit Zenchef, das dem Restaurant ein Werkzeug zur Verwaltung seiner Reservierungen und Bestellungen zur Verfügung stellt. Darüber hinaus sammelt und verarbeitet das Restaurant Ihre personenbezogenen Daten allgemeiner für die Verwaltung und Nachverfolgung seiner Beziehungen zu Ihnen, insbesondere für die Durchführung von Werbemaßnahmen auf allen Medien, insbesondere per Telefon, E-Mail oder SMS. Bezüglich der genannten Verarbeitungen haben Sie gemäß den durch die anwendbaren Bestimmungen definierten Bedingungen das Recht auf Zugang zu Ihren Daten, deren Berichtigung, Löschung und Übertragbarkeit sowie das Recht, eine Einschränkung der Verarbeitung dieser Daten zu verlangen und ein Widerspruchsrecht gegen die Verarbeitung Ihrer Daten, wobei ausdrücklich darauf hingewiesen wird, dass Sie jederzeit das Recht haben, jeder Form von Werbung ohne Angabe von Gründen oder Erklärungen zu widersprechen, oder, falls die Verarbeitung Ihrer Daten auf der Erlangung Ihrer Zustimmung beruht, das Recht, diese zu widerrufen. Sie haben auch das Recht, Anweisungen bezüglich des Schicksals Ihrer personenbezogenen Daten und der Art und Weise, wie Ihre Rechte nach Ihrem Tod ausgeübt werden sollen, festzulegen. Schließlich haben Sie die Möglichkeit, eine Beschwerde bei einer zuständigen Aufsichtsbehörde einzureichen, wenn Sie der Meinung sind, dass Ihre Daten nicht konform zu den anwendbaren Bestimmungen verarbeitet werden. Ferner wird darauf hingewiesen, dass Sie gemäß den Artikeln L.223-1 und folgenden des Verbraucherschutzgesetzes, falls Sie Verbraucher sind, sich jederzeit gegen eine telefonische Kontaktaufnahme wehren können, indem Sie sich kostenlos auf der Website www.bloctel.gouv.fr registrieren. Um mehr über die Verarbeitung Ihrer personenbezogenen Daten durch das Restaurant als gemeinsam Verantwortlicher zusammen mit Zenchef und zur Ausübung Ihrer Rechte bezüglich dieser Verarbeitungen zu erfahren, können Sie die Datenschutzrichtlinie von Zenchef einsehen. Um mehr über die Verarbeitung Ihrer personenbezogenen Daten durch das Restaurant als alleiniger Verantwortlicher für die Verarbeitung und zur Ausübung Ihrer Rechte bezüglich dieser Verarbeitungen zu erfahren, sollten Sie sich an das Restaurant wenden oder dessen Datenschutzrichtlinie online auf seiner Website einsehen, falls zutreffend.",
      },
    },
    pt: {
      // Portuguese
      translation: {
        calendar: {
          weekdays: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
          months: [
            "janeiro",
            "fevereiro",
            "março",
            "abril",
            "maio",
            "junho",
            "julho",
            "agosto",
            "setembro",
            "outubro",
            "novembro",
            "dezembro",
          ],
        },
        couverts: {
          one: "Coberto",
          other: "Cobertos",
        },
        pageTitle: "Bem-vindo",
        notAvailableMessage:
          "Se o horário que você deseja não estiver disponível, sinta-se à vontade para procurar outra data ou nos ligar no .",
        Horaires: "Horários",
        petitDejeuner: "pequeno-almoço",
        dejeuner: "Almoço",
        diner: "Jantar",
        reserver: "Reservar",
        notification: "é o limite de reserva em linha",
        ParisEvents: "ParisEventos",
        Votreréservation: "Sua reserva",
        merci:
          "Por favor, confirme sua reserva com 24 horas de antecedência ou corre o risco de cancelá-la",
        Contact: "Contato",
        Madame: "Senhora",
        Monsieur: "Senhor",
        PRÉNOM: "PRIMEIRO NOME",
        NOM: "NOME",
        TÉLÉPHONE: "TELEFONE",
        EMAIL: "E-MAIL",
        commentaires:
          "COMENTÁRIOS SOBRE ALERGIAS E HÁBITOS ALIMENTARES opcionais",
        enregistrer:
          "Salve essas informações para facilitar minhas próximas reservas",
        accepter: "Aceito as condições gerais de utilização do serviço",
        souhaite1:
          "Desejo receber novidades e programação de restaurantes por email",
        souhaite2: "Desejo receber notícias e horários de restaurantes por SMS",
        Réserver: "agendar",
        comment: "Seu comentário",
        error: "Por favor, preencha todos os campos obrigatórios",
        paragraph:
          "O restaurante no qual você faz sua solicitação de reserva ou pedido coleta e trata seus dados pessoais para fins de gestão e acompanhamento de sua solicitação e das respostas a serem fornecidas, incluindo as comunicações que lhe são enviadas por email ou SMS em relação à sua reserva (recebimento de sua solicitação, confirmação de reserva, etc.), possivelmente em conjunto com a Zenchef, que fornece ao restaurante uma ferramenta de gestão de suas reservas e pedidos. Além disso, o restaurante coleta e processa seus dados pessoais de forma mais geral para fins de gestão e acompanhamento de suas relações com você, e especialmente para a realização de operações de prospecção dirigidas a você, em todos os meios, e em particular por telefone, por email ou por SMS. Quanto aos tratamentos mencionados, você tem, nas condições definidas pelas disposições aplicáveis, o direito de acesso aos seus dados, de retificação, de apagamento e de portabilidade dos seus dados, bem como o direito de obter a limitação do tratamento desses dados e o direito de se opor ao tratamento dos seus dados, sendo especificado que você tem, em qualquer caso, o direito de se opor a qualquer prospecção a qualquer momento sem ter que fornecer motivo ou explicação, ou ainda, se o tratamento dos seus dados for baseado na obtenção do seu consentimento, o direito de retirá-lo. Você também tem o direito de definir diretrizes relativas ao destino dos seus dados pessoais e à maneira como deseja que seus direitos sejam exercidos após sua morte. Finalmente, você tem a possibilidade de apresentar uma reclamação a uma autoridade de controle competente se considerar que seus dados estão sendo tratados de forma não conforme com as disposições aplicáveis. Além disso, é especificado que, em aplicação dos artigos L.223-1 e seguintes do Código do Consumidor, você pode, se for um consumidor, opor-se a qualquer momento a ser contatado por telefone, inscrevendo-se gratuitamente no site www.bloctel.gouv.fr. Para saber mais sobre os tratamentos dos seus dados pessoais realizados pelo restaurante como responsável conjunto pelo tratamento com a Zenchef e para exercer seus direitos sobre esses tratamentos, você pode consultar a política de proteção de dados pessoais da Zenchef. Para saber mais sobre os tratamentos dos seus dados pessoais realizados pelo restaurante como único responsável pelo tratamento e para exercer seus direitos sobre esses tratamentos, cabe a você aproximar-se do restaurante ou consultar sua política de proteção de dados online em seu site, se aplicável.",
      },
    },
  },
});

function CustomAccordion() {
  const [openModal, setOpenModal] = useState(false);
  const [bookingLimit, setbookingLimit] = useState(0);

  const [shifts, setShifts] = useState([]);
  const [settings, setSettings] = useState({});
  const [pointOfSale, setpointOfSale] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const [dayStatus, setDayStatus] = useState({});

  const { id } = useParams() || {};

  console.log("id", id);

  const [timeSlots, setTimeSlots] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .post(`http://127.0.0.1:9900/`, { id: id })

        .then((response) => {
          const data = response.data;

          setpointOfSale(data?.result?.pointOfSale);
          setSettings(data?.result?.pointOfSale?.settings);
        })

        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);

  // useEffect(() => {
  //   if (settings && settings.weeklySchedules) {

  //     const initialDayStatus = {};
  //     settings.weeklySchedules.forEach((w) => {
  //       initialDayStatus[w.dayName.toLowerCase()] = {
  //         isclose: w.isClosed,
  //       };
  //     });

  //     setDayStatus(initialDayStatus);
  //     console.log("Initial Day Status:", initialDayStatus);

  //     setbookingLimit(settings.maxNbrPeople);
  //   }

  // }, [settings]);

  // useEffect(() => {
  //   if (settings && settings.weeklySchedules) {
  //     const initialDayStatus = {};
  //     settings.weeklySchedules.forEach((w) => {
  //       initialDayStatus[w.dayName.toLowerCase()] = {
  //         isClose: w.isClosed,
  //       };
  //     });

  //     setDayStatus(initialDayStatus);
  //     console.log("Initial Day Status:", initialDayStatus);

  //     setbookingLimit(settings.maxNbrPeople);
  //   }
  // }, [settings]);

  useEffect(() => {
    if (settings && settings.weeklySchedules) {
      const initialDayStatus = {};
      settings.weeklySchedules.slice(0, 7).forEach((w) => {
        console.log("Processing day:", w.dayName, "isClosed:", w.isClosed);
        initialDayStatus[w.dayName.toLowerCase()] = {
          isClose: w.isClosed,
        };
      });

      setDayStatus(initialDayStatus);
      console.log("Initial Day Status:", initialDayStatus);

      setbookingLimit(settings.maxNbrPeople);
    }
  }, [settings]);

  console.log("wek", settings.weeklySchedules);
  console.log("bookingLimit", bookingLimit);

  const isDateDisabled = ({ date, view }) => {
    if (!dayStatus) return false; // If dayStatus is not set yet, don't disable any date
    const dayName = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    const dayInfo = dayStatus[dayName];
    if (!dayInfo) return false; // If dayInfo is not set yet, don't disable any date

    return dayInfo.isClose;
  };

  useEffect(() => {
    if (selectedDate == null) return;

    let dayName = selectedDate
      .toLocaleString("en-us", { weekday: "long" })
      ?.toLowerCase();

    setShifts(
      settings?.weeklySchedules?.find(
        (w) => w.dayName.toLowerCase() == dayName && w.enabledBooking == true
      )?.shift || []
    );

    console.log("dayName", dayName);
    console.log("====>", settings);

    const generatedTimeSlots = settings?.weeklySchedules
      ?.find((w) => w.dayName.toLowerCase() == dayName)
      ?.shift.map((s) =>
        generatetimeSlots(
          s.startTime,
          s.endTime,
          pointOfSale?.BookingEachTime,
          s
        )
      );
    setTimeSlots(generatedTimeSlots);
  }, [selectedDate, settings]);

  useEffect(() => {
    if (timeSlots !== null) {
      console.log("timeSlots111", timeSlots);
    }
  }, [timeSlots]);

  const generatetimeSlots = (startTime, endTime, BookingEachTime, s) => {
    const horaire = [];
    let startMinutes = startTime * 60;
    let endMinutes = endTime * 60 - s?.timePerBooking / (1000 * 60);
    //24:00 pm
    if (endTime === 0) {
      endMinutes += 24 * 60;
    }

    //13:00 pm

    if (startTime === 1) {
      startMinutes += 12 * 60;
    }

    const intervalMinutes = BookingEachTime / (1000 * 60);
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    while (startMinutes <= endMinutes) {
      if (startMinutes > currentMinutes + intervalMinutes) {
        const hours = Math.floor(startMinutes / 60);
        const minutes = startMinutes % 60;
        horaire.push(hours * 100 + minutes);
      }
      startMinutes += intervalMinutes;
    }

    return horaire;
  };

  //   function formatTime(time) {
  // if(time){
  //   return
  // }
  //     const hours = Math.floor(time / 100);
  //     const minutes = time % 100;
  //     return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  //   }

  function formatTime(time, test = "normal") {
    if (test === "negative") {
      const [hoursStr, minutesStr] = time.split(":");
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);
      return hours + minutes / 60;
    } else {
      // Check if the time is already formatted
      if (typeof time === "string" && time.match(/^\d{2}:\d{2}$/)) {
        return time;
      }

      const hours = Math.floor(time / 100);
      const minutes = time % 100;
      return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
    }
  }

  const [expanded, setExpanded] = useState(null);

  // const [selectedDate, setSelectedDate] = useState(null);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [couverts, setCouverts] = useState(2);
  const [additionalButtons, setAdditionalButtons] = useState(0);
  const [selectedP, setSelectedP] = useState(1);
  const [selectedDayIndex, setSelectedDayIndex] = useState(-1);
  const [isReservationConfirmed, setIsReservationConfirmed] = useState(false);

  // Horaires  problem

  const [selectedTime, setSelectedTime] = useState("Horaires");

  // const [selectedTime, setSelectedTime] = useState(null);

  const isMobile = useMediaQuery("(max-width:600px)");

  const [expandedPanels, setExpandedPanels] = useState({});

  // const router = useRouter();

  const [expandedPanel3, setExpandedPanel3] = useState(null);

  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (event) => {
    const langCode = event.target.value;
    setSelectedLanguage(langCode);
    i18n.changeLanguage(langCode);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleChangePanel = (panel) => {
    console.log("expandedPanels", expandedPanels);
    setExpandedPanels((prev) => (prev == panel ? null : panel));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setExpanded("panel3");
    setIsTimeSelected(false);
    setIsReservationConfirmed(false);
  };

  const handleTimeButtonClick = (time) => {
    setIsTimeSelected(expanded === "panel3");
    setIsReservationConfirmed(expanded === "panel3");
    setExpanded(null);
    if (time == "Horaires") {
      return;
    } else {
      const t = formatTime(time);
      setSelectedTime(t);
    }
  };

  const [phone, setPhone] = useState();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [accepterConditions, setAccepterConditions] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [civilite, setCivilite] = useState("Madame");

  // const [bookingInfo, setBookingInfo] = useState({
  //   firstName: "",
  //   lastName: "",
  //   phone: "",
  //   email: "",
  //   civility: "",
  // });

  // const handleChangeData = (prop, value) => {
  //   setBookingInfo((prev) => {
  //     return { ...prev, [prop]: value };
  //   });
  // };

  useEffect(() => {
    console.log("selectedDate :>> ", selectedDate);
    console.log("couverts :>> ", couverts);
  }, [selectedDate, couverts]);

  const verifierChamps = () => {
    if (
      !civilite ||
      !prenom ||
      !nom ||
      !phone ||
      !email ||
      !accepterConditions
    ) {
      setErrorMessage(t("error"));
    } else {
      setErrorMessage("");
    }
  };

  const Civilite = (e) => {
    setCivilite(e.target.value);
    console.log(e.target.value);
  };

  const [notificationShown, setNotificationShown] = useState(false);

  const handleAddButtons = () => {
    if (additionalButtons + 3 >= bookingLimit) {
      alert(`${bookingLimit} ${t("notification")}`);
    } else {
      setAdditionalButtons((prev) => prev + 3);
    }
  };

  return (
    <div style={{ width: "100%", overflowY: "auto" }}>
      <div
        style={{
          // width: isMobile ? '100%' : '50%',
          width: isMobile ? "100%" : "600px",
          // height: isMobile ? '100vh' : '560px',
          height: isMobile ? "100vh" : "700px",
          margin: "auto",
          marginTop: isMobile ? "0" : "50px",
          backgroundColor: "black",
          color: "white",
          borderRadius: isMobile ? "0" : "20px",
          overflowY: isMobile ? "auto" : "auto",
          scrollbarWidth: "thin",
        }}
      >
        {/* Drapeau & Nom de restaurant */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: isMobile ? "10px" : "",
            }}
          >
            <div>
              <Select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                sx={{ fontSize: "30px !important" }}
                MenuProps={{ style: { marginTop: "-20px", height: "180px" } }}
              >
                <MenuItem
                  value="en"
                  sx={{
                    fontSize: "30px",
                    padding: "0",
                    justifyContent: "center",
                  }}
                >
                  <Gb />
                </MenuItem>
                <MenuItem
                  value="es"
                  sx={{
                    fontSize: "30px",
                    padding: "0",
                    justifyContent: "center",
                  }}
                >
                  <Es />
                </MenuItem>
                <MenuItem
                  value="de"
                  sx={{
                    fontSize: "30px",
                    padding: "0",
                    justifyContent: "center",
                  }}
                >
                  <De />
                </MenuItem>
                <MenuItem
                  value="pt"
                  sx={{
                    fontSize: "30px",
                    padding: "0",
                    justifyContent: "center",
                  }}
                >
                  <Pt />
                </MenuItem>
                <MenuItem
                  value="fr"
                  sx={{
                    fontSize: "30px",
                    padding: "0",
                    justifyContent: "center",
                  }}
                >
                  <Fr />
                </MenuItem>
              </Select>
            </div>
            <div
              style={{
                width: isMobile ? "63%" : "80%",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: isMobile ? "19px" : "20px",
                  fontWeight: "bold",
                }}
              >
                {pointOfSale?.title}
              </Typography>
            </div>
          </div>

          {/* // ana commantite  hna Bienvenue */}
        </div>

        {selectedP == 1 && (
          <div>
            {/* Bienvenue */}
            <Typography
              sx={{
                textAlign: "center",
                // fontWeight: "bold",
                fontSize: isMobile ? "18px" : "19px",
                marginBottom: "10px",
                marginTop: "15px",
              }}
            >
              {t("pageTitle")}
            </Typography>

            {/* Message & Téléphone */}
            <div>
              <Typography
                sx={{
                  fontSize: isMobile ? "15px" : "16px",
                  color: "grey",
                  maxWidth: "600px",
                  textAlign: "center",
                  marginLeft: isMobile ? "15px" : "25px",
                  marginRight: isMobile ? "5px" : "15px",
                }}
              >
                {t("notAvailableMessage")}
              </Typography>
              <Typography
                style={{ textAlign: "center", color: "grey", fontSize: "16px" }}
              >
                {pointOfSale?.phone}
              </Typography>
            </div>

            {/* Accordion */}
            <div style={{ marginBottom: "40px" }}>
              <Accordion
                style={{
                  marginTop: "100px",
                  backgroundColor: "black",
                  color: "white",
                }}
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Box display="flex" alignItems="center">
                    <RestaurantIcon />
                    <Typography
                      key="couverts"
                      variant="h6"
                      sx={{ ml: 1 }}
                      style={{ fontSize: "18px" }}
                    >
                      {couverts}{" "}
                      {couverts === 1 ? t("couverts.one") : t("couverts.other")}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    display: "flex",
                    backgroundColor: "black",
                    margin: isMobile ? "0 20px" : "0 20px",
                    padding: isMobile ? "0 0" : "0 10px",
                    overflowX: "auto",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      backgroundColor: "black",
                      alignItems: "center",
                      padding: "5px",
                      justifyContent: "center",
                      width: "100%",
                      minWidth: "fit-content",
                      overflowX: "hidden",
                    }}
                  >
                    {[
                      ...Array(Math.min(bookingLimit, 6 + additionalButtons)),
                    ].map((_, index) => (
                      <Button
                        key={index + 1}
                        variant="contained"
                        style={{
                          backgroundColor:
                            selectedDayIndex === index + 1
                              ? "#A0A0A0"
                              : "white",
                          color:
                            selectedDayIndex === index + 1 ? "white" : "black",
                          margin: isMobile ? "0 2px" : "0 5px",
                          height: isMobile ? "40px" : "60px",
                          minWidth: isMobile ? "40px" : "60px",
                        }}
                        onClick={() => {
                          if (index + 1 >= bookingLimit + 1) {
                            alert(`${bookingLimit} ${t("notification")}`);
                          } else {
                            handleTimeButtonClick(selectedTime);
                            // fixfct();
                            setCouverts(index + 1);
                          }
                        }}
                      >
                        {index + 1}
                      </Button>
                    ))}

                    <Button
                      variant="contained"
                      onClick={handleAddButtons}
                      disabled={additionalButtons + 3 >= bookingLimit}
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        margin: "0 5px",
                        height: isMobile ? "40px" : "60px",
                        minWidth: isMobile ? "40px" : "60px",
                        opacity: additionalButtons + 3 > bookingLimit ? 0.7 : 1,
                      }}
                    >
                      +
                    </Button>
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
                style={{ backgroundColor: "black" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <CalendarTodayOutlinedIcon
                    style={{ marginRight: "5px", color: "white" }}
                  />
                  <Typography style={{ color: "white", fontSize: "18px" }}>
                    {selectedDate
                      ? `${t(
                          `calendar.weekdays.${selectedDate.getDay()}`
                        )}, ${selectedDate.getDate()} ${t(
                          `calendar.months.${selectedDate.getMonth()}`
                        )}`
                      : `${t(
                          `calendar.weekdays.${new Date().getDay()}`
                        )}, ${new Date().getDate()} ${t(
                          `calendar.months.${new Date().getMonth()}`
                        )}`}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{ backgroundColor: "black", margin: "auto" }}
                >
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    minDate={new Date()}
                    locale={selectedLanguage}
                    formatShortWeekday={(locale, date) =>
                      t(`calendar.weekdays.${date.getDay()}`)
                    }
                    formatMonth={(locale, date) =>
                      t(`calendar.months.${date.getMonth()}`)
                    }
                    tileDisabled={isDateDisabled}
                  />
                </AccordionDetails>
              </Accordion>

              {selectedDate && (
                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <AccessTimeIcon style={{ marginTop: "2px" }} />
                    <Typography
                      variant="h6"
                      sx={{ ml: 1 }}
                      style={{ fontSize: "18px" }}
                    >
                      {" "}
                      {selectedTime}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails style={{ backgroundColor: "black" }}>
                    <div style={{ maxWidth: "100%", overflowX: "auto" }}>
                      <div>
                        {shifts?.map((sh, shiftindex) =>
                          sh.enabledOnline === false ||
                          timeSlots[shiftindex].length === 0 ? null : (
                            <Accordion
                              key={shiftindex}
                              expanded={expandedPanels == shiftindex}
                              onChange={() => handleChangePanel(shiftindex)}
                              style={{
                                backgroundColor: "#242124",
                                color: "white",
                              }}
                            >
                              <AccordionSummary
                                expandIcon={
                                  <ExpandMoreIcon style={{ color: "white" }} />
                                }
                                aria-controls="panel4a-content"
                                id="panel4a-header"
                              >
                                <Typography
                                  variant="h6"
                                  sx={{ ml: 1 }}
                                  style={{ fontSize: "16px" }}
                                >
                                  {" "}
                                  {sh.shiftName}{" "}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <div
                                  className="horaire"
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  {timeSlots[shiftindex].length > 0 &&
                                    timeSlots[shiftindex].map((RES, I) => (
                                      <Button
                                        key={`${shiftindex}-${I}`}
                                        variant="contained"
                                        onClick={() =>
                                          // handleTimeButtonClick(couverts, RES)
                                          handleTimeButtonClick(RES)
                                        }
                                        style={{
                                          fontSize: "18px",
                                          backgroundColor: "white",
                                          color: "black",
                                          marginBottom: "10px",
                                          width: "100%",
                                          justifyContent: "flex-start",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "10px",
                                            height: "10px",
                                            borderRadius: "50%",
                                            backgroundColor: "green",
                                          }}
                                        />
                                        {formatTime(RES)}
                                      </Button>
                                    ))}
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          )
                        )}
                      </div>
                      <br />

                      <br />
                      <br />
                    </div>
                  </AccordionDetails>
                </Accordion>
              )}
            </div>
          </div>
        )}
        {selectedP == 2 && (
          <div style={{ backgroundColor: "white", paddingTop: "15px" }}>
            {/* Contenue globale de réservation*/}
            <div
              style={{
                borderRadius: "10px",
                // paddingBottom: "20px"
                width: "90%",
                // backgroundColor: "#E7E5E5",
                backgroundColor: "#F7F7F7",
                height: "auto",
                margin: "auto",
                color: "black",
              }}
            >
              {/*Votre réservation & modifier*/}
              <div
                style={{
                  padding: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? "25px" : "23px",
                    // fontSize : "23px",
                    fontWeight: "bold",
                  }}
                >
                  {t("Votreréservation")}
                </div>
                <div>
                  <IconButton
                    onClick={() => {
                      setSelectedP(1);
                      console.log(
                        "selectedTime",
                        formatTime(selectedTime, "negative")
                      );
                      // let id = shifts?.findIndex(sh => sh)
                    }}
                    aria-label="Modifier"
                    style={{ color: "black", fontSize: "20px" }}
                  >
                    {/* <EditIcon /> */}
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                </div>
              </div>

              {/*Confirmation*/}
              <div>
                <Alert
                  severity="warning"
                  style={{
                    width: "85%",
                    margin: "auto",
                    fontSize: "18px",
                  }}
                >
                  {t("merci")}
                </Alert>
              </div>

              {/*Commande & date & heure*/}
              {selectedP == 2 && (
                <Informations data={[selectedDate, couverts, selectedTime]} />
              )}
            </div>

            {/*Information personnelle*/}
            <div
              style={{
                width: "90%",
                backgroundColor: "white",
                height: "auto",
                margin: "auto",
                color: "black",
                marginTop: "15px",
              }}
            >
              {/*Contact*/}
              <div
                style={{
                  fontWeight: "bold",
                  paddingLeft: "10px",
                  fontSize: isMobile ? "25px" : "23px",
                }}
              >
                {t("Contact")}
              </div>

              {/* Civilité */}
              <div style={{ display: "flex" }} className="custom-radio-button">
                <span className={civilite === "Madame" ? "radio-checked" : ""}>
                  <input
                    type="radio"
                    value="Madame"
                    name="civilite"
                    id="madame"
                    onChange={Civilite}
                    checked={civilite === "Madame"}
                  />
                  <label htmlFor="madame">{t("Madame")}</label>
                </span>

                <span
                  className={civilite === "Monsieur" ? "radio-checked" : ""}
                >
                  <input
                    type="radio"
                    value="Monsieur"
                    name="civilite"
                    id="monsieur"
                    onChange={Civilite}
                    checked={civilite === "Monsieur"}
                  />
                  <label htmlFor="monsieur">{t("Monsieur")}</label>
                </span>
              </div>

              {/*Nom & Prénom*/}
              <div
                style={{
                  display: isMobile ? "block" : "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                {/*Prénom*/}
                <div style={{ marginTop: "10px" }}>
                  <Typography
                    style={{
                      fontSize: isMobile ? "15px" : "13px",
                    }}
                  >
                    {t("PRÉNOM")}
                    <span
                      style={{
                        color: "red",
                        fontSize: "20px",
                        marginLeft: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      *
                    </span>
                  </Typography>
                  <TextField
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: isMobile ? 40 : 37,
                        width: isMobile ? 350 : 252,
                      },
                    }}
                  />
                </div>

                {/*Nom*/}
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: isMobile ? "15px" : "13px",
                    }}
                  >
                    {t("NOM")}
                    <span
                      style={{
                        color: "red",
                        fontSize: "20px",
                        marginLeft: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      *
                    </span>
                  </Typography>
                  <TextField
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: isMobile ? 40 : 37,
                        width: isMobile ? 350 : 252,
                      },
                    }}
                  />
                </div>
              </div>

              {/*Téléphone & Email*/}
              <div
                style={{
                  display: isMobile ? "block" : "flex",
                  width: "100%",
                  marginTop: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/*Téléphone*/}
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: isMobile ? "15px" : "13px",
                    }}
                  >
                    {t("TÉLÉPHONE")}
                    <span
                      style={{
                        color: "red",
                        fontSize: "20px",
                        marginLeft: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      *
                    </span>
                  </Typography>
                  <PhoneInput
                    country={"fr"}
                    onlyCountries={["fr", "us", "de", "es", "pt"]}
                    value={phone}
                    specialLabel={""}
                    onChange={setPhone}
                    inputStyle={{
                      fontSize: isMobile ? "17px" : "",
                      width: isMobile ? "350px" : "252px",
                      height: isMobile ? "40px" : "30px",
                    }}
                    dropdownStyle={{
                      fontSize: isMobile ? "18px" : "16px",
                    }}
                  />
                </div>

                {/*Email*/}
                <div
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    marginLeft: isMobile ? "" : "28px",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: isMobile ? "15px" : "13px",
                    }}
                  >
                    {t("EMAIL")}
                    <span
                      style={{
                        color: "red",
                        fontSize: "20px",
                        marginLeft: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      *
                    </span>
                  </Typography>
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: isMobile ? 40 : 37,
                        width: isMobile ? 350 : 252,
                      },
                    }}
                  />
                </div>
              </div>

              {/*Commentaire*/}
              <div
                style={{
                  margin: "auto",
                  marginTop: "20px",
                }}
              >
                <Typography
                  style={{
                    fontSize: isMobile ? "15px" : "13px",
                  }}
                >
                  {t("commentaires")}
                </Typography>
                <TextareaAutosize
                  aria-label="textarea"
                  placeholder={t("comment")}
                  style={{
                    width: isMobile ? "98%" : "99%",
                    height: isMobile ? "50px" : "70px",
                    resize: "none",
                  }}
                />
              </div>

              {/*Accéptation "Checkbox"*/}
              <div
                style={{
                  margin: "10px 15px",
                  width: "90%",
                }}
              >
                <FormGroup
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "black",
                    },
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) =>
                          setAccepterConditions(e.target.checked)
                        }
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                      />
                    }
                    label={
                      <div
                        style={{
                          fontSize: isMobile ? "16px" : "15px",
                        }}
                      >
                        {t("accepter")}
                        <span>
                          <OpenInNew
                            sx={{
                              marginLeft: "2px",
                              fontSize: isMobile ? "18px" : "18px",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenModal(true);
                            }}
                          />
                        </span>
                        <span
                          style={{
                            color: "red",
                            fontSize: "20px",
                            marginLeft: "5px",
                            fontWeight: "bold",
                          }}
                        >
                          *
                        </span>
                        <Modal
                          open={openModal}
                          onClose={() => setOpenModal(false)}
                          // aria-labelledby="modal-modal-title"
                          // aria-describedby="modal-modal-description"
                        >
                          <Box
                            sx={{
                              position: "fixed",
                              top: isMobile ? "0" : "50px", // Ajustez la valeur selon votre besoin
                              left: "0",
                              right: "0",
                              bottom: "0",
                              margin: "auto",
                              width: isMobile ? "100%" : "600px",
                              height: isMobile ? "100vh" : "700px",
                              backgroundColor: "white",
                              borderRadius: isMobile ? "0" : "20px",
                              overflowY: "auto",
                              scrollbarWidth: "thin",
                              position: "relative",
                            }}
                          >
                            <IconButton
                              size="large"
                              sx={{
                                position: "absolute",
                                // position : "fixed",
                                top: "10px",
                                right: "10px",
                              }}
                              onClick={() => setOpenModal(false)}
                            >
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                            <Conditions />
                          </Box>
                        </Modal>
                      </div>
                    }
                  />
                </FormGroup>
              </div>

              {/*Enregistrement des information et souhait*/}
              <div
                style={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  padding: "8px",
                }}
              >
                <FormGroup
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "black",
                      verticalAlign: "bottom",
                    },
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={true}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                      />
                    }
                    label={t("enregistrer")}
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: isMobile ? "15px" : "13px",
                      },
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                        checked={true}
                      />
                    }
                    label={t("souhaite1")}
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: isMobile ? "15px" : "13px",
                      },
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                        checked={true}
                      />
                    }
                    label={t("souhaite2")}
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: isMobile ? "15px" : "13px",
                      },
                    }}
                  />
                </FormGroup>
              </div>

              {/* Message d'erreur */}
              {errorMessage && (
                <Alert
                  severity="error"
                  sx={{
                    marginTop: "20px",
                  }}
                >
                  {errorMessage}
                </Alert>
              )}

              {/*"Bouton" Faire une demande de réservation */}
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    verifierChamps();
                  }}
                  style={{
                    backgroundColor: "#000000",
                    "&:hover": { backgroundColor: "#0a0a0a" },
                    marginTop: "20px",
                    fontWeight: isMobile ? "bold" : "",
                    height: "auto",
                    fontSize: isMobile ? "13px" : "15px",
                  }}
                >
                  {t("Réserver")}
                </Button>
              </div>

              {/* Description de restaurant */}
              <div
                style={{
                  margin: "auto",
                  marginTop: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: isMobile ? "14px" : "13px",
                    textAlign: "justify",
                  }}
                >
                  {t("paragraph")}
                </Typography>
              </div>
            </div>
          </div>
        )}

        {selectedP == 1 && (
          <Button
            onClick={() => {
              setSelectedP(2);
              setExpanded({});
            }}
            variant="contained"
            style={{
              backgroundColor:
                isTimeSelected && isReservationConfirmed
                  ? "white"
                  : "lightgrey",
              color:
                isTimeSelected && isReservationConfirmed ? "black" : "grey",
              width: "50%",
              marginLeft: "25%",
              marginBottom: "100px",
            }}
            disabled={!isTimeSelected || !isReservationConfirmed}
          >
            {t("reserver")}
          </Button>
        )}
      </div>
    </div>
  );
}

export default CustomAccordion;
