(function () {
  "use strict";

  var STORAGE_KEY = "lang";
  var LANGS = [
    { code: "tr", flag: "🇹🇷", label: "Türkçe" },
    { code: "en", flag: "🇬🇧", label: "English" },
    { code: "es", flag: "🇪🇸", label: "Español" },
    { code: "el", flag: "🇬🇷", label: "Ελληνικά" },
    { code: "fr", flag: "🇫🇷", label: "Français" },
    { code: "ru", flag: "🇷🇺", label: "Русский" },
    { code: "de", flag: "🇩🇪", label: "Deutsch" }
  ];

  var UI = {
    en: {
      "nav.products": "Products", "nav.blog": "Blog", "nav.wholesale": "Wholesale", "nav.about": "About Us", "nav.contact": "Contact", "nav.cta": "Get in Touch",
      "wholesale.eyebrow": "Wholesale", "wholesale.title": "Wholesale Soap Orders",
      "wholesale.text": "We supply handmade soap in bulk to gift shops, hotels, spas and wedding/event companies. Contact us for wholesale pricing and quantity options across our entire catalog — cut soap, heart sponge soap, gift sets and more.",
      "wholesale.li1": "Wholesale soap for gift shops", "wholesale.li2": "Custom packaging for hotels and spas",
      "wholesale.li3": "Bulk orders for weddings and events", "wholesale.li4": "Corporate gift soap sets",
      "wholesale.cta": "Message Us on WhatsApp for Wholesale Pricing",
      "search.placeholder": "Search products or scents… (e.g. lavender)",
      "search.startHint": "Start typing a product or scent name to search.",
      "search.noResults": 'No results for "{q}".',
      "search.moreResults": "+{n} more results, narrow your search.",
      "hero.eyebrow": "Handcrafted · Natural Ingredients",
      "hero.title": "Shaped by hand,<br>born from nature",
      "hero.text": "All the soaps in our catalog are handmade, crafted with natural oils and carefully selected ingredients. Browse our full collection below and get in touch with us about any products you like.",
      "hero.exploreBtn": "Explore Products", "hero.contactBtn": "Contact Us to Order", "hero.downloadPdf": "📄 Download PDF Catalog",
      "products.eyebrow": "Collection", "products.title": "Our Products",
      "products.text": "Click a category to browse all the products and scents within it.",
      "card.variantCount": "{n} scents", "card.photoCount": "{n} photos", "card.view": "View →",
      "about.eyebrow": "About Us", "about.title": "Every soap is shaped by hand, with patience",
      "about.p1": "For us, making soap is less a production process than an expression of respect for nature. Each bar is mixed, rested and hand-shaped with care, like something from a warm kitchen; no two soaps are ever exactly alike — and we see that not as a flaw, but as the signature of handmade craft.",
      "about.p2": "As we bring together natural oils, botanical extracts and skin-friendly ingredients, we have one goal: soaps you can enjoy both using and looking at, and trust with confidence. From everyday use to special-occasion gifts, we have a scent for every need.",
      "about.li1": "Handmade, small-batch production", "about.li2": "Natural oils and carefully chosen ingredients",
      "about.li3": "Gift sets for special occasions", "about.li4": "Wholesale / retail orders available",
      "contact.eyebrow": "Contact", "contact.title": "Get in touch for orders and information",
      "contact.text": "Reach us via WhatsApp, phone, email or Instagram for any products you like.",
      "contact.whatsapp": "WhatsApp", "contact.phone": "Phone", "contact.email": "Email", "contact.instagram": "Instagram",
      "contact.address": "Address", "contact.hours": "Opening Hours",
      "contact.hoursValue": "Mon–Fri 09:00–19:00 · Sat 10:00–18:00 · Sun 11:00–18:00",
      "footer.rights": "© 2026 Troy Soapun. All rights reserved.", "footer.note": "This site is for product showcase purposes only.",
      "cookie.message": "This site uses cookies to improve your experience and understand visitor statistics.",
      "cookie.accept": "Accept", "cookie.reject": "Reject",
      "whatsapp.floatMessage": "Hello, I'd like some information about your products.", "whatsapp.floatLabel": "Message us on WhatsApp",
      "detail.share": "📤 Share", "share.whatsapp": "💬 Share on WhatsApp", "share.copyLink": "🔗 Copy Link", "share.copied": "Copied!",
      "category.back": "← Back to all categories", "item.addToQuote": "Add to quote",
      "detail.back": "← Back to category", "detail.order": "Message Us on WhatsApp to Order",
      "detail.addToQuote": "Add to my quote list", "detail.otherVariants": "Other scents in this category",
      "detail.orderMessage": "Hello, I'd like some information about {name}.",
      "quote.fabLabel": "My Quote List", "quote.panelTitle": "Your Quote List",
      "quote.emailLabel": "Your email address", "quote.emailPlaceholder": "you@example.com",
      "quote.submit": "Get a Quote", "quote.note": "The products you selected will be sent to us along with your email address.",
      "quote.empty": 'You haven\'t added any products yet. Check the "Add to quote" box under the products you like.',
      "quote.invalidEmail": "Please enter a valid email address.", "quote.noItems": "Add some products to the list first.",
      "quote.sending": "Sending…", "quote.success": "Thank you! Your quote request has been sent to us.",
      "quote.failedPrefix": "Couldn't send it. ", "quote.failedLink": "Click here",
      "quote.failedSuffix": " to send it from your own email app instead.",
      "quote.mailSubject": "Quote Request - Troy Soapun",
      "quote.mailIntro": "Hello,\n\nI'd like a quote for the following products:\n\n",
      "quote.mailEmailLine": "\n\nYou can reach me at: {email}\n",
      "quote.fieldCustomerEmail": "Customer email", "quote.fieldRequestedProducts": "Requested products", "quote.fieldMessage": "Message"
    },
    es: {
      "nav.products": "Productos", "nav.blog": "Blog", "nav.wholesale": "Venta al por Mayor", "nav.about": "Sobre Nosotros", "nav.contact": "Contacto", "nav.cta": "Contáctanos",
      "wholesale.eyebrow": "Venta al por Mayor", "wholesale.title": "Pedidos de Jabón al por Mayor",
      "wholesale.text": "Suministramos jabón artesanal al por mayor a tiendas de regalos, hoteles, spas y empresas de bodas/eventos. Contáctanos para conocer precios y cantidades al por mayor en todo nuestro catálogo — jabón cortado, jabón esponja en forma de corazón, sets de regalo y más.",
      "wholesale.li1": "Jabón al por mayor para tiendas de regalos", "wholesale.li2": "Empaque personalizado para hoteles y spas",
      "wholesale.li3": "Pedidos al por mayor para bodas y eventos", "wholesale.li4": "Sets de jabón de regalo corporativo",
      "wholesale.cta": "Escríbenos por WhatsApp para Precios al por Mayor",
      "search.placeholder": "Buscar productos o aromas… (p. ej. lavanda)",
      "search.startHint": "Empieza a escribir el nombre de un producto o aroma para buscar.",
      "search.noResults": 'No hay resultados para "{q}".',
      "search.moreResults": "+{n} resultados más, acota tu búsqueda.",
      "hero.eyebrow": "Hecho a Mano · Ingredientes Naturales",
      "hero.title": "Moldeados a mano,<br>nacidos de la naturaleza",
      "hero.text": "Todos los jabones de nuestro catálogo están hechos a mano, elaborados con aceites naturales e ingredientes cuidadosamente seleccionados. Explora nuestra colección completa a continuación y contáctanos por los productos que te gusten.",
      "hero.exploreBtn": "Explorar Productos", "hero.contactBtn": "Contáctanos para Pedir", "hero.downloadPdf": "📄 Descargar Catálogo PDF",
      "products.eyebrow": "Colección", "products.title": "Nuestros Productos",
      "products.text": "Haz clic en una categoría para ver todos los productos y aromas que contiene.",
      "card.variantCount": "{n} aromas", "card.photoCount": "{n} fotos", "card.view": "Ver →",
      "about.eyebrow": "Sobre Nosotros", "about.title": "Cada jabón se moldea a mano, con paciencia",
      "about.p1": "Para nosotros, hacer jabón es más una muestra de respeto por la naturaleza que un simple proceso de producción. Cada pastilla se mezcla, se deja reposar y se moldea a mano con esmero, como en una cocina cálida; ningún jabón es exactamente igual a otro — y no lo vemos como un defecto, sino como la firma del trabajo artesanal.",
      "about.p2": "Al combinar aceites naturales, extractos botánicos e ingredientes respetuosos con la piel, tenemos un solo objetivo: ofrecer jabones que disfrutes tanto al usarlos como al mirarlos, y que puedas elegir con total confianza. Desde el uso diario hasta los regalos especiales, tenemos un aroma para cada ocasión.",
      "about.li1": "Producción artesanal en pequeños lotes", "about.li2": "Aceites naturales e ingredientes cuidadosamente elegidos",
      "about.li3": "Sets de regalo para ocasiones especiales", "about.li4": "Pedidos al por mayor / al por menor disponibles",
      "contact.eyebrow": "Contacto", "contact.title": "Contáctanos para pedidos e información",
      "contact.text": "Puedes contactarnos por WhatsApp, teléfono, correo electrónico o Instagram por cualquier producto que te guste.",
      "contact.whatsapp": "WhatsApp", "contact.phone": "Teléfono", "contact.email": "Correo electrónico", "contact.instagram": "Instagram",
      "contact.address": "Dirección", "contact.hours": "Horario de Atención",
      "contact.hoursValue": "Lun–Vie 09:00–19:00 · Sáb 10:00–18:00 · Dom 11:00–18:00",
      "footer.rights": "© 2026 Troy Soapun. Todos los derechos reservados.", "footer.note": "Este sitio es únicamente un catálogo de presentación de productos.",
      "cookie.message": "Este sitio utiliza cookies para mejorar tu experiencia y comprender las estadísticas de visitantes.",
      "cookie.accept": "Aceptar", "cookie.reject": "Rechazar",
      "whatsapp.floatMessage": "Hola, me gustaría información sobre sus productos.", "whatsapp.floatLabel": "Escríbenos por WhatsApp",
      "detail.share": "📤 Compartir", "share.whatsapp": "💬 Compartir en WhatsApp", "share.copyLink": "🔗 Copiar Enlace", "share.copied": "¡Copiado!",
      "category.back": "← Volver a todas las categorías", "item.addToQuote": "Añadir a la solicitud",
      "detail.back": "← Volver a la categoría", "detail.order": "Escríbenos por WhatsApp para Pedir",
      "detail.addToQuote": "Añadir a mi lista de solicitud", "detail.otherVariants": "Otros aromas de esta categoría",
      "detail.orderMessage": "Hola, me gustaría información sobre {name}.",
      "quote.fabLabel": "Mi Solicitud", "quote.panelTitle": "Tu Lista de Solicitud",
      "quote.emailLabel": "Tu correo electrónico", "quote.emailPlaceholder": "tu@ejemplo.com",
      "quote.submit": "Solicitar Presupuesto", "quote.note": "Los productos seleccionados se nos enviarán junto con tu correo electrónico.",
      "quote.empty": 'Aún no has añadido ningún producto. Marca la casilla "Añadir a la solicitud" bajo los productos que te gusten.',
      "quote.invalidEmail": "Por favor introduce un correo electrónico válido.", "quote.noItems": "Primero añade productos a la lista.",
      "quote.sending": "Enviando…", "quote.success": "¡Gracias! Tu solicitud nos ha sido enviada.",
      "quote.failedPrefix": "No se pudo enviar. ", "quote.failedLink": "Haz clic aquí",
      "quote.failedSuffix": " para enviarlo desde tu propio programa de correo.",
      "quote.mailSubject": "Solicitud de Presupuesto - Troy Soapun",
      "quote.mailIntro": "Hola,\n\nMe gustaría solicitar un presupuesto para los siguientes productos:\n\n",
      "quote.mailEmailLine": "\n\nPuedes contactarme en: {email}\n",
      "quote.fieldCustomerEmail": "Correo del cliente", "quote.fieldRequestedProducts": "Productos solicitados", "quote.fieldMessage": "Mensaje"
    },
    el: {
      "nav.products": "Προϊόντα", "nav.blog": "Ιστολόγιο", "nav.wholesale": "Χονδρική", "nav.about": "Σχετικά με εμάς", "nav.contact": "Επικοινωνία", "nav.cta": "Επικοινωνήστε",
      "wholesale.eyebrow": "Χονδρική Πώληση", "wholesale.title": "Παραγγελίες Σαπουνιού Χονδρικής",
      "wholesale.text": "Προμηθεύουμε χειροποίητο σαπούνι χονδρικής σε καταστήματα δώρων, ξενοδοχεία, spa και εταιρείες γάμων/εκδηλώσεων. Επικοινωνήστε μαζί μας για τιμές και ποσότητες χονδρικής σε ολόκληρο τον κατάλογό μας.",
      "wholesale.li1": "Σαπούνι χονδρικής για καταστήματα δώρων", "wholesale.li2": "Εξατομικευμένη συσκευασία για ξενοδοχεία και spa",
      "wholesale.li3": "Παραγγελίες χονδρικής για γάμους και εκδηλώσεις", "wholesale.li4": "Εταιρικά σετ σαπουνιού δώρου",
      "wholesale.cta": "Στείλτε μας μήνυμα στο WhatsApp για Τιμές Χονδρικής",
      "search.placeholder": "Αναζήτηση προϊόντος ή αρώματος… (π.χ. λεβάντα)",
      "search.startHint": "Πληκτρολογήστε το όνομα ενός προϊόντος ή αρώματος για αναζήτηση.",
      "search.noResults": 'Δεν βρέθηκαν αποτελέσματα για «{q}».',
      "search.moreResults": "+{n} ακόμη αποτελέσματα, περιορίστε την αναζήτηση.",
      "hero.eyebrow": "Χειροποίητο · Φυσικά Συστατικά",
      "hero.title": "Σαπούνια που πλάθονται στο χέρι,<br>γεννημένα από τη φύση",
      "hero.text": "Όλα τα σαπούνια του καταλόγου μας είναι χειροποίητα, φτιαγμένα με φυσικά έλαια και προσεκτικά επιλεγμένα συστατικά. Περιηγηθείτε στη συλλογή μας παρακάτω και επικοινωνήστε μαζί μας για τα προϊόντα που σας αρέσουν.",
      "hero.exploreBtn": "Δείτε τα Προϊόντα", "hero.contactBtn": "Επικοινωνήστε για Παραγγελία", "hero.downloadPdf": "📄 Λήψη PDF Καταλόγου",
      "products.eyebrow": "Συλλογή", "products.title": "Τα Προϊόντα μας",
      "products.text": "Κάντε κλικ σε μια κατηγορία για να δείτε όλα τα προϊόντα και τα αρώματά της.",
      "card.variantCount": "{n} αρώματα", "card.photoCount": "{n} φωτογραφίες", "card.view": "Προβολή →",
      "about.eyebrow": "Σχετικά με εμάς", "about.title": "Κάθε σαπούνι πλάθεται στο χέρι, με υπομονή",
      "about.p1": "Για εμάς, η κατασκευή σαπουνιού είναι περισσότερο μια έκφραση σεβασμού προς τη φύση παρά μια απλή διαδικασία παραγωγής. Κάθε κομμάτι ανακατεύεται, ξεκουράζεται και πλάθεται στο χέρι με φροντίδα, σαν σε μια ζεστή κουζίνα· κανένα σαπούνι δεν είναι ακριβώς ίδιο με το άλλο — και το βλέπουμε αυτό όχι ως ατέλεια, αλλά ως την υπογραφή της χειροποίητης τέχνης.",
      "about.p2": "Συνδυάζοντας φυσικά έλαια, φυτικά εκχυλίσματα και φιλικά προς το δέρμα συστατικά, έχουμε έναν στόχο: σαπούνια που θα απολαμβάνετε τόσο όταν τα χρησιμοποιείτε όσο και όταν τα βλέπετε, και που μπορείτε να εμπιστευτείτε με σιγουριά. Από την καθημερινή χρήση έως τα ιδιαίτερα δώρα, έχουμε ένα άρωμα για κάθε ανάγκη.",
      "about.li1": "Χειροποίητη παραγωγή σε μικρές παρτίδες", "about.li2": "Φυσικά έλαια και προσεκτικά επιλεγμένα συστατικά",
      "about.li3": "Δώρα και σετ για ιδιαίτερες περιστάσεις", "about.li4": "Δυνατότητα χονδρικής / λιανικής παραγγελίας",
      "contact.eyebrow": "Επικοινωνία", "contact.title": "Επικοινωνήστε μαζί μας για παραγγελίες και πληροφορίες",
      "contact.text": "Μπορείτε να επικοινωνήσετε μαζί μας μέσω WhatsApp, τηλεφώνου, email ή Instagram για οποιοδήποτε προϊόν σας αρέσει.",
      "contact.whatsapp": "WhatsApp", "contact.phone": "Τηλέφωνο", "contact.email": "Email", "contact.instagram": "Instagram",
      "contact.address": "Διεύθυνση", "contact.hours": "Ώρες Λειτουργίας",
      "contact.hoursValue": "Δευ–Παρ 09:00–19:00 · Σάβ 10:00–18:00 · Κυρ 11:00–18:00",
      "footer.rights": "© 2026 Troy Soapun. Με επιφύλαξη παντός δικαιώματος.", "footer.note": "Αυτός ο ιστότοπος προορίζεται μόνο για την παρουσίαση προϊόντων.",
      "cookie.message": "Αυτός ο ιστότοπος χρησιμοποιεί cookies για να βελτιώσει την εμπειρία σας και να κατανοήσει τα στατιστικά επισκεπτών.",
      "cookie.accept": "Αποδοχή", "cookie.reject": "Απόρριψη",
      "whatsapp.floatMessage": "Γεια σας, θα ήθελα πληροφορίες για τα προϊόντα σας.", "whatsapp.floatLabel": "Στείλτε μας μήνυμα στο WhatsApp",
      "detail.share": "📤 Κοινοποίηση", "share.whatsapp": "💬 Κοινοποίηση στο WhatsApp", "share.copyLink": "🔗 Αντιγραφή Συνδέσμου", "share.copied": "Αντιγράφηκε!",
      "category.back": "← Πίσω σε όλες τις κατηγορίες", "item.addToQuote": "Προσθήκη στο αίτημα",
      "detail.back": "← Πίσω στην κατηγορία", "detail.order": "Στείλτε μας μήνυμα στο WhatsApp για Παραγγελία",
      "detail.addToQuote": "Προσθήκη στη λίστα αιτήματος", "detail.otherVariants": "Άλλα αρώματα σε αυτή την κατηγορία",
      "detail.orderMessage": "Γεια σας, θα ήθελα πληροφορίες για το {name}.",
      "quote.fabLabel": "Το Αίτημά μου", "quote.panelTitle": "Η Λίστα Αιτήματός σας",
      "quote.emailLabel": "Το email σας", "quote.emailPlaceholder": "you@example.com",
      "quote.submit": "Ζητήστε Προσφορά", "quote.note": "Τα προϊόντα που επιλέξατε θα μας σταλούν μαζί με το email σας.",
      "quote.empty": 'Δεν έχετε προσθέσει ακόμη προϊόντα. Επιλέξτε το κουτάκι «Προσθήκη στο αίτημα» κάτω από τα προϊόντα που σας αρέσουν.',
      "quote.invalidEmail": "Παρακαλώ εισάγετε ένα έγκυρο email.", "quote.noItems": "Προσθέστε πρώτα προϊόντα στη λίστα.",
      "quote.sending": "Αποστολή…", "quote.success": "Ευχαριστούμε! Το αίτημά σας μας εστάλη.",
      "quote.failedPrefix": "Δεν ήταν δυνατή η αποστολή. ", "quote.failedLink": "Κάντε κλικ εδώ",
      "quote.failedSuffix": " για να το στείλετε από το δικό σας πρόγραμμα email.",
      "quote.mailSubject": "Αίτημα Προσφοράς - Troy Soapun",
      "quote.mailIntro": "Γεια σας,\n\nΘα ήθελα προσφορά για τα παρακάτω προϊόντα:\n\n",
      "quote.mailEmailLine": "\n\nΜπορείτε να επικοινωνήσετε μαζί μου στο: {email}\n",
      "quote.fieldCustomerEmail": "Email πελάτη", "quote.fieldRequestedProducts": "Ζητούμενα προϊόντα", "quote.fieldMessage": "Μήνυμα"
    },
    fr: {
      "nav.products": "Produits", "nav.blog": "Blog", "nav.wholesale": "Vente en Gros", "nav.about": "À Propos", "nav.contact": "Contact", "nav.cta": "Nous Contacter",
      "wholesale.eyebrow": "Vente en Gros", "wholesale.title": "Commandes de Savon en Gros",
      "wholesale.text": "Nous fournissons du savon artisanal en gros aux boutiques de cadeaux, hôtels, spas et entreprises de mariages/événements. Contactez-nous pour les prix et quantités en gros sur tout notre catalogue.",
      "wholesale.li1": "Savon en gros pour boutiques de cadeaux", "wholesale.li2": "Emballage personnalisé pour hôtels et spas",
      "wholesale.li3": "Commandes groupées pour mariages et événements", "wholesale.li4": "Coffrets de savon cadeaux d'entreprise",
      "wholesale.cta": "Écrivez-nous sur WhatsApp pour les Prix en Gros",
      "search.placeholder": "Rechercher un produit ou un parfum… (ex. lavande)",
      "search.startHint": "Commencez à taper le nom d'un produit ou d'un parfum pour rechercher.",
      "search.noResults": 'Aucun résultat pour « {q} ».',
      "search.moreResults": "+{n} résultats supplémentaires, affinez votre recherche.",
      "hero.eyebrow": "Fait Main · Ingrédients Naturels",
      "hero.title": "Façonnés à la main,<br>nés de la nature",
      "hero.text": "Tous les savons de notre catalogue sont faits main, élaborés avec des huiles naturelles et des ingrédients soigneusement sélectionnés. Parcourez toute notre collection ci-dessous et contactez-nous pour les produits qui vous plaisent.",
      "hero.exploreBtn": "Découvrir les Produits", "hero.contactBtn": "Nous Contacter pour Commander", "hero.downloadPdf": "📄 Télécharger le Catalogue PDF",
      "products.eyebrow": "Collection", "products.title": "Nos Produits",
      "products.text": "Cliquez sur une catégorie pour découvrir tous les produits et parfums qu'elle contient.",
      "card.variantCount": "{n} parfums", "card.photoCount": "{n} photos", "card.view": "Voir →",
      "about.eyebrow": "À Propos", "about.title": "Chaque savon est façonné à la main, avec patience",
      "about.p1": "Pour nous, fabriquer du savon est moins un processus de production qu'une expression de respect pour la nature. Chaque pain est mélangé, reposé et façonné à la main avec soin, comme dans une cuisine chaleureuse ; aucun savon n'est jamais tout à fait identique à un autre — et nous ne voyons pas cela comme un défaut, mais comme la signature du savoir-faire artisanal.",
      "about.p2": "En réunissant huiles naturelles, extraits botaniques et ingrédients doux pour la peau, nous avons un seul objectif : des savons que vous apprécierez à utiliser comme à regarder, et que vous pourrez choisir en toute confiance. De l'usage quotidien aux cadeaux d'occasions spéciales, nous avons un parfum pour chaque besoin.",
      "about.li1": "Fabrication artisanale, en petites séries", "about.li2": "Huiles naturelles et ingrédients soigneusement choisis",
      "about.li3": "Coffrets cadeaux pour occasions spéciales", "about.li4": "Commandes en gros / au détail possibles",
      "contact.eyebrow": "Contact", "contact.title": "Contactez-nous pour vos commandes et informations",
      "contact.text": "Vous pouvez nous joindre par WhatsApp, téléphone, e-mail ou Instagram pour tout produit qui vous plaît.",
      "contact.whatsapp": "WhatsApp", "contact.phone": "Téléphone", "contact.email": "E-mail", "contact.instagram": "Instagram",
      "contact.address": "Adresse", "contact.hours": "Horaires d'Ouverture",
      "contact.hoursValue": "Lun–Ven 09:00–19:00 · Sam 10:00–18:00 · Dim 11:00–18:00",
      "footer.rights": "© 2026 Troy Soapun. Tous droits réservés.", "footer.note": "Ce site est uniquement à des fins de présentation des produits.",
      "cookie.message": "Ce site utilise des cookies pour améliorer votre expérience et comprendre les statistiques des visiteurs.",
      "cookie.accept": "Accepter", "cookie.reject": "Refuser",
      "whatsapp.floatMessage": "Bonjour, j'aimerais des informations sur vos produits.", "whatsapp.floatLabel": "Écrivez-nous sur WhatsApp",
      "detail.share": "📤 Partager", "share.whatsapp": "💬 Partager sur WhatsApp", "share.copyLink": "🔗 Copier le Lien", "share.copied": "Copié !",
      "category.back": "← Retour à toutes les catégories", "item.addToQuote": "Ajouter à la demande",
      "detail.back": "← Retour à la catégorie", "detail.order": "Écrivez-nous sur WhatsApp pour Commander",
      "detail.addToQuote": "Ajouter à ma liste de demande", "detail.otherVariants": "Autres parfums de cette catégorie",
      "detail.orderMessage": "Bonjour, j'aimerais avoir des informations sur {name}.",
      "quote.fabLabel": "Ma Demande", "quote.panelTitle": "Votre Liste de Demande",
      "quote.emailLabel": "Votre adresse e-mail", "quote.emailPlaceholder": "vous@exemple.com",
      "quote.submit": "Demander un Devis", "quote.note": "Les produits que vous avez sélectionnés nous seront envoyés avec votre adresse e-mail.",
      "quote.empty": 'Vous n\'avez encore ajouté aucun produit. Cochez la case « Ajouter à la demande » sous les produits qui vous plaisent.',
      "quote.invalidEmail": "Veuillez saisir une adresse e-mail valide.", "quote.noItems": "Ajoutez d'abord des produits à la liste.",
      "quote.sending": "Envoi en cours…", "quote.success": "Merci ! Votre demande nous a été envoyée.",
      "quote.failedPrefix": "Échec de l'envoi. ", "quote.failedLink": "Cliquez ici",
      "quote.failedSuffix": " pour l'envoyer depuis votre propre messagerie.",
      "quote.mailSubject": "Demande de Devis - Troy Soapun",
      "quote.mailIntro": "Bonjour,\n\nJe souhaiterais un devis pour les produits suivants :\n\n",
      "quote.mailEmailLine": "\n\nVous pouvez me joindre à : {email}\n",
      "quote.fieldCustomerEmail": "E-mail du client", "quote.fieldRequestedProducts": "Produits demandés", "quote.fieldMessage": "Message"
    },
    ru: {
      "nav.products": "Продукция", "nav.blog": "Блог", "nav.wholesale": "Оптом", "nav.about": "О нас", "nav.contact": "Контакты", "nav.cta": "Связаться с нами",
      "wholesale.eyebrow": "Оптовая Продажа", "wholesale.title": "Оптовые Заказы Мыла",
      "wholesale.text": "Мы поставляем мыло ручной работы оптом магазинам подарков, отелям, спа-центрам и организаторам свадеб/мероприятий. Свяжитесь с нами для уточнения оптовых цен и количества по всему каталогу.",
      "wholesale.li1": "Оптовое мыло для магазинов подарков", "wholesale.li2": "Индивидуальная упаковка для отелей и спа",
      "wholesale.li3": "Оптовые заказы для свадеб и мероприятий", "wholesale.li4": "Корпоративные подарочные наборы мыла",
      "wholesale.cta": "Написать в WhatsApp для Оптовых Цен",
      "search.placeholder": "Поиск товара или аромата… (напр. лаванда)",
      "search.startHint": "Начните вводить название товара или аромата для поиска.",
      "search.noResults": 'По запросу «{q}» ничего не найдено.',
      "search.moreResults": "Ещё +{n} результатов, уточните поиск.",
      "hero.eyebrow": "Ручная работа · Натуральные ингредиенты",
      "hero.title": "Мыло, созданное вручную,<br>рождённое природой",
      "hero.text": "Всё мыло в нашем каталоге изготовлено вручную из натуральных масел и тщательно подобранных ингредиентов. Просмотрите нашу коллекцию ниже и свяжитесь с нами по поводу понравившихся товаров.",
      "hero.exploreBtn": "Смотреть Продукцию", "hero.contactBtn": "Связаться для Заказа", "hero.downloadPdf": "📄 Скачать PDF Каталог",
      "products.eyebrow": "Коллекция", "products.title": "Наша Продукция",
      "products.text": "Нажмите на категорию, чтобы увидеть все товары и ароматы в ней.",
      "card.variantCount": "{n} ароматов", "card.photoCount": "{n} фото", "card.view": "Смотреть →",
      "about.eyebrow": "О нас", "about.title": "Каждое мыло создаётся вручную, с терпением",
      "about.p1": "Для нас изготовление мыла — это не просто производственный процесс, а выражение уважения к природе. Каждый кусочек тщательно перемешивается, отстаивается и формируется вручную, как на тёплой кухне; ни одно мыло никогда не бывает точь-в-точь похоже на другое — и мы видим в этом не недостаток, а подпись ручной работы.",
      "about.p2": "Соединяя натуральные масла, растительные экстракты и бережные к коже ингредиенты, мы преследуем одну цель: мыло, которым приятно пользоваться и на которое приятно смотреть, и которому можно доверять. От повседневного использования до подарков по особым случаям — у нас найдётся аромат на любой случай.",
      "about.li1": "Ручное производство небольшими партиями", "about.li2": "Натуральные масла и тщательно подобранные ингредиенты",
      "about.li3": "Подарочные наборы для особых случаев", "about.li4": "Возможен оптовый / розничный заказ",
      "contact.eyebrow": "Контакты", "contact.title": "Свяжитесь с нами по вопросам заказа и информации",
      "contact.text": "Вы можете связаться с нами через WhatsApp, телефон, email или Instagram по любому понравившемуся товару.",
      "contact.whatsapp": "WhatsApp", "contact.phone": "Телефон", "contact.email": "Email", "contact.instagram": "Instagram",
      "contact.address": "Адрес", "contact.hours": "Часы Работы",
      "contact.hoursValue": "Пн–Пт 09:00–19:00 · Сб 10:00–18:00 · Вс 11:00–18:00",
      "footer.rights": "© 2026 Troy Soapun. Все права защищены.", "footer.note": "Этот сайт предназначен только для демонстрации продукции.",
      "cookie.message": "Этот сайт использует файлы cookie для улучшения вашего опыта и анализа статистики посетителей.",
      "cookie.accept": "Принять", "cookie.reject": "Отклонить",
      "whatsapp.floatMessage": "Здравствуйте, хотел(а) бы узнать больше о ваших товарах.", "whatsapp.floatLabel": "Написать в WhatsApp",
      "detail.share": "📤 Поделиться", "share.whatsapp": "💬 Поделиться в WhatsApp", "share.copyLink": "🔗 Скопировать Ссылку", "share.copied": "Скопировано!",
      "category.back": "← Ко всем категориям", "item.addToQuote": "Добавить в заявку",
      "detail.back": "← К категории", "detail.order": "Написать в WhatsApp для Заказа",
      "detail.addToQuote": "Добавить в мою заявку", "detail.otherVariants": "Другие ароматы в этой категории",
      "detail.orderMessage": "Здравствуйте, хотел(а) бы узнать подробнее о {name}.",
      "quote.fabLabel": "Моя Заявка", "quote.panelTitle": "Ваша Заявка",
      "quote.emailLabel": "Ваш email", "quote.emailPlaceholder": "you@example.com",
      "quote.submit": "Запросить Предложение", "quote.note": "Выбранные вами товары будут отправлены нам вместе с вашим email.",
      "quote.empty": 'Вы ещё не добавили ни одного товара. Отметьте галочку «Добавить в заявку» под понравившимися товарами.',
      "quote.invalidEmail": "Пожалуйста, введите действительный email.", "quote.noItems": "Сначала добавьте товары в список.",
      "quote.sending": "Отправка…", "quote.success": "Спасибо! Ваша заявка отправлена нам.",
      "quote.failedPrefix": "Не удалось отправить. ", "quote.failedLink": "Нажмите здесь",
      "quote.failedSuffix": " чтобы отправить через собственную почтовую программу.",
      "quote.mailSubject": "Запрос предложения - Troy Soapun",
      "quote.mailIntro": "Здравствуйте,\n\nХотел(а) бы получить предложение по следующим товарам:\n\n",
      "quote.mailEmailLine": "\n\nСо мной можно связаться по адресу: {email}\n",
      "quote.fieldCustomerEmail": "Email клиента", "quote.fieldRequestedProducts": "Запрошенные товары", "quote.fieldMessage": "Сообщение"
    },
    de: {
      "nav.products": "Produkte", "nav.blog": "Blog", "nav.wholesale": "Großhandel", "nav.about": "Über Uns", "nav.contact": "Kontakt", "nav.cta": "Kontakt Aufnehmen",
      "wholesale.eyebrow": "Großhandel", "wholesale.title": "Großhandelsbestellungen für Seife",
      "wholesale.text": "Wir beliefern Geschenkläden, Hotels, Spas und Hochzeits-/Eventfirmen mit handgefertigter Seife im Großhandel. Kontaktieren Sie uns für Großhandelspreise und Mengen für unseren gesamten Katalog.",
      "wholesale.li1": "Großhandelsseife für Geschenkläden", "wholesale.li2": "Individuelle Verpackung für Hotels und Spas",
      "wholesale.li3": "Sammelbestellungen für Hochzeiten und Events", "wholesale.li4": "Firmengeschenk-Seifensets",
      "wholesale.cta": "Schreiben Sie uns auf WhatsApp für Großhandelspreise",
      "search.placeholder": "Produkt oder Duft suchen… (z. B. Lavendel)",
      "search.startHint": "Geben Sie einen Produkt- oder Duftnamen ein, um zu suchen.",
      "search.noResults": 'Keine Ergebnisse für „{q}".',
      "search.moreResults": "+{n} weitere Ergebnisse, grenzen Sie die Suche ein.",
      "hero.eyebrow": "Handgefertigt · Natürliche Zutaten",
      "hero.title": "Von Hand geformt,<br>aus der Natur geboren",
      "hero.text": "Alle Seifen in unserem Katalog sind handgefertigt, mit natürlichen Ölen und sorgfältig ausgewählten Zutaten hergestellt. Durchstöbern Sie unten unsere gesamte Kollektion und kontaktieren Sie uns zu Produkten, die Ihnen gefallen.",
      "hero.exploreBtn": "Produkte Entdecken", "hero.contactBtn": "Kontakt für Bestellung", "hero.downloadPdf": "📄 PDF-Katalog Herunterladen",
      "products.eyebrow": "Kollektion", "products.title": "Unsere Produkte",
      "products.text": "Klicken Sie auf eine Kategorie, um alle darin enthaltenen Produkte und Düfte zu sehen.",
      "card.variantCount": "{n} Düfte", "card.photoCount": "{n} Fotos", "card.view": "Ansehen →",
      "about.eyebrow": "Über Uns", "about.title": "Jede Seife wird von Hand geformt, mit Geduld",
      "about.p1": "Für uns ist Seifenherstellung weniger ein Produktionsprozess als vielmehr ein Ausdruck des Respekts vor der Natur. Jedes Stück wird sorgfältig vermischt, ruhen gelassen und von Hand geformt, wie in einer warmen Küche; keine Seife gleicht exakt der anderen — und das sehen wir nicht als Makel, sondern als Signatur echter Handwerkskunst.",
      "about.p2": "Beim Zusammenführen natürlicher Öle, pflanzlicher Extrakte und hautfreundlicher Zutaten verfolgen wir ein Ziel: Seifen, die sowohl bei der Anwendung als auch beim Betrachten Freude bereiten und denen Sie vertrauen können. Vom täglichen Gebrauch bis zum besonderen Geschenk — für jeden Anlass haben wir den passenden Duft.",
      "about.li1": "Handgefertigte Kleinserien-Produktion", "about.li2": "Natürliche Öle und sorgfältig ausgewählte Zutaten",
      "about.li3": "Geschenksets für besondere Anlässe", "about.li4": "Großhandel / Einzelhandel auf Anfrage möglich",
      "contact.eyebrow": "Kontakt", "contact.title": "Kontaktieren Sie uns für Bestellungen und Informationen",
      "contact.text": "Sie erreichen uns per WhatsApp, Telefon, E-Mail oder Instagram zu jedem Produkt, das Ihnen gefällt.",
      "contact.whatsapp": "WhatsApp", "contact.phone": "Telefon", "contact.email": "E-Mail", "contact.instagram": "Instagram",
      "contact.address": "Adresse", "contact.hours": "Öffnungszeiten",
      "contact.hoursValue": "Mo–Fr 09:00–19:00 · Sa 10:00–18:00 · So 11:00–18:00",
      "footer.rights": "© 2026 Troy Soapun. Alle Rechte vorbehalten.", "footer.note": "Diese Website dient ausschließlich der Produktpräsentation.",
      "cookie.message": "Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern und Besucherstatistiken zu verstehen.",
      "cookie.accept": "Akzeptieren", "cookie.reject": "Ablehnen",
      "whatsapp.floatMessage": "Hallo, ich hätte gerne Informationen zu Ihren Produkten.", "whatsapp.floatLabel": "Schreiben Sie uns auf WhatsApp",
      "detail.share": "📤 Teilen", "share.whatsapp": "💬 Auf WhatsApp Teilen", "share.copyLink": "🔗 Link Kopieren", "share.copied": "Kopiert!",
      "category.back": "← Zurück zu allen Kategorien", "item.addToQuote": "Zur Anfrage hinzufügen",
      "detail.back": "← Zurück zur Kategorie", "detail.order": "Für Bestellung per WhatsApp Schreiben",
      "detail.addToQuote": "Zu meiner Anfrageliste hinzufügen", "detail.otherVariants": "Weitere Düfte dieser Kategorie",
      "detail.orderMessage": "Hallo, ich hätte gerne Informationen zu {name}.",
      "quote.fabLabel": "Meine Anfrage", "quote.panelTitle": "Ihre Anfrageliste",
      "quote.emailLabel": "Ihre E-Mail-Adresse", "quote.emailPlaceholder": "sie@beispiel.com",
      "quote.submit": "Angebot Anfordern", "quote.note": "Die von Ihnen ausgewählten Produkte werden zusammen mit Ihrer E-Mail-Adresse an uns gesendet.",
      "quote.empty": 'Sie haben noch keine Produkte hinzugefügt. Aktivieren Sie das Kästchen „Zur Anfrage hinzufügen" unter den Produkten, die Ihnen gefallen.',
      "quote.invalidEmail": "Bitte geben Sie eine gültige E-Mail-Adresse ein.", "quote.noItems": "Fügen Sie zuerst Produkte zur Liste hinzu.",
      "quote.sending": "Wird gesendet…", "quote.success": "Vielen Dank! Ihre Anfrage wurde an uns gesendet.",
      "quote.failedPrefix": "Senden fehlgeschlagen. ", "quote.failedLink": "Hier klicken",
      "quote.failedSuffix": " um es über Ihr eigenes E-Mail-Programm zu senden.",
      "quote.mailSubject": "Angebotsanfrage - Troy Soapun",
      "quote.mailIntro": "Hallo,\n\nich möchte ein Angebot für folgende Produkte anfragen:\n\n",
      "quote.mailEmailLine": "\n\nSie erreichen mich unter: {email}\n",
      "quote.fieldCustomerEmail": "Kunden-E-Mail", "quote.fieldRequestedProducts": "Angefragte Produkte", "quote.fieldMessage": "Nachricht"
    }
  };

  var CATEGORIES = {
    en: {
      "kesme-sabun": { title: "Cut Soap", subtitle: "125 g", description: "Handmade cut soaps made with natural oils, offered in a variety of distinctive scents and ingredients." },
      "kalp-sunger": { title: "Heart Sponge Soap", subtitle: "135 g", description: "Heart-shaped, sponge-infused soaps carefully prepared, ideal as gifts." },
      "askili-sabun": { title: "Hanging Soap", subtitle: null, description: "Soap on a cord that can be hung up, both decorative and functional." },
      "soguk-proses": { title: "Handmade Cold Process Soap", subtitle: null, description: "Our cold-process soap line, usable on face, hair and body, made with natural ingredients." },
      "paksa-sabun": { title: "Paksa Soap", subtitle: "125 g", description: "Our soap line offered in a wide range of varieties, from skincare to special-purpose uses." },
      "oval-sunger": { title: "Oval Sponge Soap", subtitle: "135 g", description: "Ideal for everyday use with its soft texture and oval shape, sponge-infused — in a variety of scents." },
      "tas-dovme": { title: "Hammered Stone Soap", subtitle: "120 g", description: "Our specially designed soap shaped using the traditional hammering technique, with a natural stone-like texture." },
      "kagit-sarmali": { title: "Paper-Wrapped Soap", subtitle: "150 g", description: "Our soap suitable for both gifting and everyday use, wrapped with an elegant paper detail." },
      "tahtali-buklet": { title: "Wooden Board Textured Soap", subtitle: null, description: "Our specially designed soap presented on a wooden board, with a curled texture." },
      "kabak-lifli": { title: "Loofah Soap", subtitle: "100 g", description: "Our special soap with a natural loofah embedded inside, gently exfoliating the skin — in a variety of scents." },
      "uclu-set": { title: "Trio Soap Set", subtitle: null, description: "Our set of three complementary soaps, also a great choice as a gift." },
      "lux-uclu-set": { title: "Luxury Trio Set", subtitle: null, description: "Our luxury trio soap set, standing out with its elegant packaging, ideal for gifting." },
      "zeytinyagi-uclu": { title: "Trio Olive Oil Soap", subtitle: null, description: "Our natural soap made with pure olive oil, offered as a set of three." },
      "asetatli-hediyelik": { title: "Acetate Gift Set", subtitle: "Scrub Mitt + Soap", description: "Our elegant gift set presenting a scrub mitt and soap together in an acetate box." }
    },
    es: {
      "kesme-sabun": { title: "Jabón Cortado", subtitle: "125 g", description: "Jabones cortados artesanales elaborados con aceites naturales, disponibles en una variedad de aromas e ingredientes distintivos." },
      "kalp-sunger": { title: "Jabón Esponja en Forma de Corazón", subtitle: "135 g", description: "Jabones en forma de corazón con esponja incorporada, preparados con esmero, ideales para regalar." },
      "askili-sabun": { title: "Jabón Colgante", subtitle: null, description: "Jabón que se puede colgar de un cordón, decorativo y funcional a la vez." },
      "soguk-proses": { title: "Jabón Artesanal de Proceso en Frío", subtitle: null, description: "Nuestra línea de jabones de proceso en frío, apta para rostro, cabello y cuerpo, elaborada con ingredientes naturales." },
      "paksa-sabun": { title: "Jabón Paksa", subtitle: "125 g", description: "Nuestra línea de jabones disponible en una amplia variedad, desde el cuidado de la piel hasta usos especiales." },
      "oval-sunger": { title: "Jabón Esponja Ovalado", subtitle: "135 g", description: "Ideal para el uso diario por su textura suave y forma ovalada, con esponja incorporada — en variedad de aromas." },
      "tas-dovme": { title: "Jabón Martillado con Textura de Piedra", subtitle: "120 g", description: "Nuestro jabón de diseño especial, moldeado con la técnica tradicional de martillado, con textura natural de piedra." },
      "kagit-sarmali": { title: "Jabón Envuelto en Papel", subtitle: "150 g", description: "Nuestro jabón apto tanto para regalo como para uso diario, envuelto con un elegante detalle de papel." },
      "tahtali-buklet": { title: "Jabón con Textura Rizada sobre Madera", subtitle: null, description: "Nuestro jabón de diseño especial, presentado sobre una tabla de madera, con textura rizada." },
      "kabak-lifli": { title: "Jabón con Esponja Vegetal (Lufa)", subtitle: "100 g", description: "Nuestro jabón especial con una lufa natural incorporada en su interior, que exfolia la piel con suavidad — en variedad de aromas." },
      "uclu-set": { title: "Set de Tres Jabones", subtitle: null, description: "Nuestro set de tres jabones que se complementan entre sí, también ideal como regalo." },
      "lux-uclu-set": { title: "Set de Lujo de Tres", subtitle: null, description: "Nuestro set de lujo de tres jabones, que destaca por su elegante empaque, ideal para regalar." },
      "zeytinyagi-uclu": { title: "Jabón de Aceite de Oliva (Trío)", subtitle: null, description: "Nuestro jabón natural elaborado con aceite de oliva puro, ofrecido en un set de tres." },
      "asetatli-hediyelik": { title: "Set de Regalo en Caja de Acetato", subtitle: "Guante Exfoliante + Jabón", description: "Nuestro elegante set de regalo que presenta un guante exfoliante y jabón juntos en una caja de acetato." }
    },
    el: {
      "kesme-sabun": { title: "Σαπούνι σε Κομμάτια", subtitle: "125 γρ", description: "Χειροποίητα κομμένα σαπούνια από φυσικά έλαια, διαθέσιμα σε ποικιλία ξεχωριστών αρωμάτων και συστατικών." },
      "kalp-sunger": { title: "Σαπούνι-Σφουγγάρι σε Σχήμα Καρδιάς", subtitle: "135 γρ", description: "Σαπούνια σε σχήμα καρδιάς με ενσωματωμένο σφουγγάρι, φτιαγμένα με φροντίδα, ιδανικά για δώρο." },
      "askili-sabun": { title: "Κρεμαστό Σαπούνι", subtitle: null, description: "Σαπούνι με κορδόνι που μπορεί να κρεμαστεί, τόσο διακοσμητικό όσο και πρακτικό." },
      "soguk-proses": { title: "Χειροποίητο Σαπούνι Ψυχρής Μεθόδου", subtitle: null, description: "Η σειρά μας από σαπούνια ψυχρής μεθόδου, κατάλληλα για πρόσωπο, μαλλιά και σώμα, με φυσικά συστατικά." },
      "paksa-sabun": { title: "Σαπούνι Paksa", subtitle: "125 γρ", description: "Η σειρά σαπουνιών μας σε ευρεία ποικιλία, από τη φροντίδα του δέρματος έως ειδικές χρήσεις." },
      "oval-sunger": { title: "Οβάλ Σαπούνι-Σφουγγάρι", subtitle: "135 γρ", description: "Ιδανικό για καθημερινή χρήση με την απαλή του υφή και το οβάλ σχήμα, με ενσωματωμένο σφουγγάρι — σε ποικιλία αρωμάτων." },
      "tas-dovme": { title: "Σφυρήλατο Σαπούνι με Υφή Πέτρας", subtitle: "120 γρ", description: "Το ειδικά σχεδιασμένο σαπούνι μας, διαμορφωμένο με την παραδοσιακή τεχνική σφυρηλάτησης, με φυσική υφή πέτρας." },
      "kagit-sarmali": { title: "Σαπούνι Τυλιγμένο σε Χαρτί", subtitle: "150 γρ", description: "Το σαπούνι μας, κατάλληλο τόσο για δώρο όσο και για καθημερινή χρήση, τυλιγμένο με μια κομψή λεπτομέρεια από χαρτί." },
      "tahtali-buklet": { title: "Σαπούνι σε Ξύλινη Βάση με Σγουρή Υφή", subtitle: null, description: "Το ειδικά σχεδιασμένο σαπούνι μας, παρουσιασμένο σε ξύλινη βάση, με σγουρή υφή." },
      "kabak-lifli": { title: "Σαπούνι με Λούφα", subtitle: "100 γρ", description: "Το ειδικό μας σαπούνι με φυσική λούφα ενσωματωμένη στο εσωτερικό, που απολεπίζει απαλά το δέρμα — σε ποικιλία αρωμάτων." },
      "uclu-set": { title: "Σετ Τριών Σαπουνιών", subtitle: null, description: "Το σετ μας από τρία σαπούνια που αλληλοσυμπληρώνονται, ιδανικό επίσης ως δώρο." },
      "lux-uclu-set": { title: "Πολυτελές Σετ Τριών", subtitle: null, description: "Το πολυτελές μας σετ τριών σαπουνιών, που ξεχωρίζει για τη κομψή του συσκευασία, ιδανικό για δώρο." },
      "zeytinyagi-uclu": { title: "Σαπούνι Ελαιολάδου (Σετ Τριών)", subtitle: null, description: "Το φυσικό μας σαπούνι από αγνό ελαιόλαδο, προσφερόμενο σε σετ τριών." },
      "asetatli-hediyelik": { title: "Δωρο-Σετ σε Κουτί Ασετάτ", subtitle: "Γάντι Απολέπισης + Σαπούνι", description: "Το κομψό μας δωρο-σετ που παρουσιάζει ένα γάντι απολέπισης και σαπούνι μαζί σε κουτί από ασετάτ." }
    },
    fr: {
      "kesme-sabun": { title: "Savon Découpé", subtitle: "125 g", description: "Savons découpés artisanaux à base d'huiles naturelles, proposés dans une variété de parfums et d'ingrédients distinctifs." },
      "kalp-sunger": { title: "Savon-Éponge en Forme de Cœur", subtitle: "135 g", description: "Savons en forme de cœur avec éponge intégrée, préparés avec soin, idéaux à offrir." },
      "askili-sabun": { title: "Savon à Suspendre", subtitle: null, description: "Savon sur cordon que l'on peut suspendre, à la fois décoratif et pratique." },
      "soguk-proses": { title: "Savon Artisanal à Froid", subtitle: null, description: "Notre gamme de savons saponifiés à froid, utilisables sur le visage, les cheveux et le corps, à base d'ingrédients naturels." },
      "paksa-sabun": { title: "Savon Paksa", subtitle: "125 g", description: "Notre gamme de savons proposée dans une large variété, du soin de la peau aux usages spécifiques." },
      "oval-sunger": { title: "Savon-Éponge Ovale", subtitle: "135 g", description: "Idéal pour un usage quotidien grâce à sa texture douce et sa forme ovale, avec éponge intégrée — en plusieurs parfums." },
      "tas-dovme": { title: "Savon Martelé Effet Pierre", subtitle: "120 g", description: "Notre savon au design particulier, façonné selon la technique traditionnelle du martelage, à la texture naturelle de pierre." },
      "kagit-sarmali": { title: "Savon Emballé dans du Papier", subtitle: "150 g", description: "Notre savon adapté aussi bien aux cadeaux qu'à l'usage quotidien, enveloppé d'un élégant détail en papier." },
      "tahtali-buklet": { title: "Savon Texturé Présenté sur Bois", subtitle: null, description: "Notre savon au design particulier, présenté sur une planche en bois, à la texture bouclée." },
      "kabak-lifli": { title: "Savon à la Luffa", subtitle: "100 g", description: "Notre savon spécial avec une luffa naturelle intégrée à l'intérieur, qui exfolie délicatement la peau — en plusieurs parfums." },
      "uclu-set": { title: "Coffret de Trois Savons", subtitle: null, description: "Notre coffret de trois savons qui se complètent, également un excellent choix cadeau." },
      "lux-uclu-set": { title: "Coffret de Luxe de Trois", subtitle: null, description: "Notre coffret de luxe de trois savons, qui se distingue par son emballage élégant, idéal à offrir." },
      "zeytinyagi-uclu": { title: "Savon à l'Huile d'Olive (Trio)", subtitle: null, description: "Notre savon naturel à l'huile d'olive pure, proposé en coffret de trois." },
      "asetatli-hediyelik": { title: "Coffret Cadeau en Boîte Acétate", subtitle: "Gant Exfoliant + Savon", description: "Notre élégant coffret cadeau présentant un gant exfoliant et un savon ensemble dans une boîte en acétate." }
    },
    ru: {
      "kesme-sabun": { title: "Нарезное Мыло", subtitle: "125 г", description: "Ручное нарезное мыло на натуральных маслах, представлено в разнообразии особых ароматов и ингредиентов." },
      "kalp-sunger": { title: "Мыло-Губка в Форме Сердца", subtitle: "135 г", description: "Мыло в форме сердца со встроенной губкой, тщательно изготовленное, идеально для подарка." },
      "askili-sabun": { title: "Мыло на Верёвочке", subtitle: null, description: "Мыло на шнурке, которое можно подвесить — декоративное и функциональное." },
      "soguk-proses": { title: "Мыло Ручной Работы Холодным Способом", subtitle: null, description: "Наша линейка мыла холодного способа варки для лица, волос и тела на натуральных ингредиентах." },
      "paksa-sabun": { title: "Мыло Paksa", subtitle: "125 г", description: "Наша линейка мыла в широком ассортименте — от ухода за кожей до особых целей применения." },
      "oval-sunger": { title: "Овальное Мыло-Губка", subtitle: "135 г", description: "Идеально для ежедневного использования благодаря мягкой текстуре и овальной форме, со встроенной губкой — в разных ароматах." },
      "tas-dovme": { title: "Кованое Мыло с Каменной Текстурой", subtitle: "120 г", description: "Наше особое мыло, сформированное традиционной техникой ковки, с естественной текстурой камня." },
      "kagit-sarmali": { title: "Мыло в Бумажной Обёртке", subtitle: "150 г", description: "Наше мыло, подходящее и для подарка, и для ежедневного использования, с элегантной бумажной обёрткой." },
      "tahtali-buklet": { title: "Мыло с Волнистой Текстурой на Деревянной Подставке", subtitle: null, description: "Наше особое мыло, представленное на деревянной подставке, с волнистой текстурой." },
      "kabak-lifli": { title: "Мыло с Люфой", subtitle: "100 г", description: "Наше особое мыло с натуральной люфой внутри, бережно отшелушивающее кожу — в разных ароматах." },
      "uclu-set": { title: "Набор из Трёх Видов Мыла", subtitle: null, description: "Наш набор из трёх дополняющих друг друга видов мыла, отличный вариант для подарка." },
      "lux-uclu-set": { title: "Люкс-Набор из Трёх", subtitle: null, description: "Наш люксовый набор из трёх видов мыла, выделяющийся элегантной упаковкой, отлично подходит для подарка." },
      "zeytinyagi-uclu": { title: "Оливковое Мыло (Набор из Трёх)", subtitle: null, description: "Наше натуральное мыло на чистом оливковом масле, представленное набором из трёх штук." },
      "asetatli-hediyelik": { title: "Подарочный Набор в Ацетатной Коробке", subtitle: "Мочалка-Кесе + Мыло", description: "Наш элегантный подарочный набор, представляющий мочалку-кесе и мыло вместе в ацетатной коробке." }
    },
    de: {
      "kesme-sabun": { title: "Geschnittene Seife", subtitle: "125 g", description: "Handgefertigte geschnittene Seifen aus natürlichen Ölen, erhältlich in einer Vielfalt unverwechselbarer Düfte und Zutaten." },
      "kalp-sunger": { title: "Herz-Schwamm-Seife", subtitle: "135 g", description: "Herzförmige Seifen mit integriertem Schwamm, sorgfältig hergestellt, ideal als Geschenk." },
      "askili-sabun": { title: "Hänge-Seife", subtitle: null, description: "Seife an einer Schnur zum Aufhängen, sowohl dekorativ als auch praktisch." },
      "soguk-proses": { title: "Handgefertigte Kaltverseifte Seife", subtitle: null, description: "Unsere kaltverseifte Seifenserie für Gesicht, Haar und Körper aus natürlichen Zutaten." },
      "paksa-sabun": { title: "Paksa-Seife", subtitle: "125 g", description: "Unsere Seifenserie in einer breiten Vielfalt, von der Hautpflege bis zu speziellen Anwendungen." },
      "oval-sunger": { title: "Ovale Schwamm-Seife", subtitle: "135 g", description: "Ideal für den täglichen Gebrauch dank weicher Textur und ovaler Form, mit integriertem Schwamm — in verschiedenen Düften." },
      "tas-dovme": { title: "Gehämmerte Steinoptik-Seife", subtitle: "120 g", description: "Unsere besonders gestaltete Seife, mit traditioneller Hammertechnik geformt, mit natürlicher Steinoptik." },
      "kagit-sarmali": { title: "Papierumwickelte Seife", subtitle: "150 g", description: "Unsere Seife für Geschenke und den täglichen Gebrauch, mit einem eleganten Papier-Detail umwickelt." },
      "tahtali-buklet": { title: "Seife mit Lockentextur auf Holzbrett", subtitle: null, description: "Unsere besonders gestaltete Seife, auf einem Holzbrett präsentiert, mit gelockter Textur." },
      "kabak-lifli": { title: "Luffa-Seife", subtitle: "100 g", description: "Unsere besondere Seife mit eingearbeiteter natürlicher Luffa, die die Haut sanft peelt — in verschiedenen Düften." },
      "uclu-set": { title: "Dreier-Seifenset", subtitle: null, description: "Unser Set aus drei sich ergänzenden Seifen, auch als Geschenk bestens geeignet." },
      "lux-uclu-set": { title: "Luxus-Dreierset", subtitle: null, description: "Unser luxuriöses Dreier-Seifenset, das durch seine elegante Verpackung besticht, ideal zum Verschenken." },
      "zeytinyagi-uclu": { title: "Olivenöl-Seife (Dreierset)", subtitle: null, description: "Unsere natürliche Seife aus reinem Olivenöl, angeboten im Dreierset." },
      "asetatli-hediyelik": { title: "Geschenkset in Acetat-Box", subtitle: "Peeling-Handschuh + Seife", description: "Unser elegantes Geschenkset, das einen Peeling-Handschuh und Seife zusammen in einer Acetat-Box präsentiert." }
    }
  };

  var VARIANTS = {
    en: {
      "Aktif Kömür & Karbon": "Activated Charcoal & Carbon", "Aloe Vera": "Aloe Vera", "Amber": "Amber", "Anti-Acne": "Anti-Acne",
      "Ardıç Katranı": "Juniper Tar", "Argan": "Argan", "Argan Yağı": "Argan Oil", "Avokado": "Avocado", "Aynı Sefa": "Source of Healing",
      "Bal": "Honey", "Bal & Keçi Sütü": "Honey & Goat Milk", "Balık": "Fish", "Bebek": "Baby", "Biberiye": "Rosemary", "Bıttım": "Terebinth",
      "Christmas": "Christmas", "Cilt Beyazlatma": "Skin Brightening", "Cilt Beyazlatıcı": "Skin Brightener", "Damla Sakızı": "Mastic",
      "Defne": "Laurel", "Defne & Badem Yağı": "Laurel & Almond Oil", "Dilek": "Wish", "Elma": "Apple", "Eşek Sütü": "Donkey Milk",
      "Eşek Sütü & Bal": "Donkey Milk & Honey", "Gül": "Rose", "Hamam": "Hammam", "Himalaya Tuzu": "Himalayan Salt",
      "Hindistan Cevizi": "Coconut", "Hyaralonik Asit": "Hyaluronic Acid", "Isırgan": "Nettle", "Kahve": "Coffee", "Karpuz": "Watermelon",
      "Kayısı": "Apricot", "Kefir": "Kefir", "Keçi Sütü": "Goat Milk", "Kil": "Clay", "Kiraz": "Cherry",
      "Kojik Asit & Pirinç": "Kojic Acid & Rice", "Kolajen": "Collagen", "Kükürt": "Sulfur", "Lavanta": "Lavender", "Limon": "Lemon",
      "Limon & Portakal": "Lemon & Orange", "Love You": "Love You", "Makademya": "Macadamia", "Mandalina": "Tangerine", "Mango": "Mango",
      "Menthol": "Menthol", "Misk": "Musk", "Misk & Amber": "Musk & Amber", "Misk Tahara": "Musk Tahara", "Mor Reyhan": "Purple Basil",
      "Nar": "Pomegranate", "Nazar": "Evil Eye", "Nemlendirici Kremli": "Moisturizing Cream", "Okyanus": "Ocean", "Orkide": "Orchid",
      "Orman Meyvesi": "Wild Berries", "Oud": "Oud", "Papatya": "Chamomile", "Pirinç": "Rice", "Q10 Yaşlanma Karşıtı": "Q10 Anti-Aging",
      "Ruşur Taşlı": "Pumice Stone", "Ruşur Taşı": "Pumice Stone", "Safran": "Saffron", "Salatalık": "Cucumber", "Salyangoz": "Snail",
      "Sarımsak": "Garlic", "Saç Bakım": "Hair Care", "Siyah Üzüm Çekirdeği": "Black Grape Seed", "Tropikal": "Tropical",
      "Türk Hamamı": "Turkish Bath", "Türk Hamamı & Pirinç Yağı": "Turkish Bath & Rice Oil", "Ud": "Oud", "Vanilya": "Vanilla",
      "Vitamin E": "Vitamin E", "Yosun": "Seaweed", "Yılan Yağlı": "Snake Oil", "Yılan Yağı": "Snake Oil", "Zerdeçal": "Turmeric",
      "Zeytin": "Olive", "Zeytin Yapraklı": "Olive Leaf", "Zeytinyağlı": "With Olive Oil", "Zeytinyağı": "Olive Oil",
      "Çay Ağacı": "Tea Tree", "Çilek": "Strawberry", "Çörek Otu": "Black Seed", "Çörekotu": "Black Seed", "İhram": "Ihram",
      "İnci Tozu": "Pearl Powder", "Şeftali": "Peach", "Aktif Karbon": "Active Carbon", "Avokado & Chia": "Avocado & Chia",
      "Ulu Ağaç": "Olive Tree", "Shea Butter": "Shea Butter"
    },
    es: {
      "Aktif Kömür & Karbon": "Carbón Activado", "Aloe Vera": "Aloe Vera", "Amber": "Ámbar", "Anti-Acne": "Anti-Acné",
      "Ardıç Katranı": "Alquitrán de Enebro", "Argan": "Argán", "Argan Yağı": "Aceite de Argán", "Avokado": "Aguacate", "Aynı Sefa": "Fuente de Sanación",
      "Bal": "Miel", "Bal & Keçi Sütü": "Miel y Leche de Cabra", "Balık": "Pez", "Bebek": "Bebé", "Biberiye": "Romero", "Bıttım": "Terebinto",
      "Christmas": "Navidad", "Cilt Beyazlatma": "Aclarado de Piel", "Cilt Beyazlatıcı": "Blanqueador de Piel", "Damla Sakızı": "Almáciga",
      "Defne": "Laurel", "Defne & Badem Yağı": "Laurel y Aceite de Almendra", "Dilek": "Deseo", "Elma": "Manzana", "Eşek Sütü": "Leche de Burra",
      "Eşek Sütü & Bal": "Leche de Burra y Miel", "Gül": "Rosa", "Hamam": "Hammam", "Himalaya Tuzu": "Sal del Himalaya",
      "Hindistan Cevizi": "Coco", "Hyaralonik Asit": "Ácido Hialurónico", "Isırgan": "Ortiga", "Kahve": "Café", "Karpuz": "Sandía",
      "Kayısı": "Albaricoque", "Kefir": "Kéfir", "Keçi Sütü": "Leche de Cabra", "Kil": "Arcilla", "Kiraz": "Cereza",
      "Kojik Asit & Pirinç": "Ácido Kójico y Arroz", "Kolajen": "Colágeno", "Kükürt": "Azufre", "Lavanta": "Lavanda", "Limon": "Limón",
      "Limon & Portakal": "Limón y Naranja", "Love You": "Te Amo", "Makademya": "Macadamia", "Mandalina": "Mandarina", "Mango": "Mango",
      "Menthol": "Mentol", "Misk": "Almizcle", "Misk & Amber": "Almizcle y Ámbar", "Misk Tahara": "Almizcle Tahara", "Mor Reyhan": "Albahaca Morada",
      "Nar": "Granada", "Nazar": "Ojo Turco", "Nemlendirici Kremli": "Crema Hidratante", "Okyanus": "Océano", "Orkide": "Orquídea",
      "Orman Meyvesi": "Frutos del Bosque", "Oud": "Oud", "Papatya": "Manzanilla", "Pirinç": "Arroz", "Q10 Yaşlanma Karşıtı": "Q10 Antienvejecimiento",
      "Ruşur Taşlı": "Piedra Pómez", "Ruşur Taşı": "Piedra Pómez", "Safran": "Azafrán", "Salatalık": "Pepino", "Salyangoz": "Caracol",
      "Sarımsak": "Ajo", "Saç Bakım": "Cuidado del Cabello", "Siyah Üzüm Çekirdeği": "Semilla de Uva Negra", "Tropikal": "Tropical",
      "Türk Hamamı": "Baño Turco", "Türk Hamamı & Pirinç Yağı": "Baño Turco y Aceite de Arroz", "Ud": "Oud", "Vanilya": "Vainilla",
      "Vitamin E": "Vitamina E", "Yosun": "Algas", "Yılan Yağlı": "Aceite de Serpiente", "Yılan Yağı": "Aceite de Serpiente", "Zerdeçal": "Cúrcuma",
      "Zeytin": "Aceituna", "Zeytin Yapraklı": "Hoja de Olivo", "Zeytinyağlı": "Con Aceite de Oliva", "Zeytinyağı": "Aceite de Oliva",
      "Çay Ağacı": "Árbol de Té", "Çilek": "Fresa", "Çörek Otu": "Comino Negro", "Çörekotu": "Comino Negro", "İhram": "Ihram",
      "İnci Tozu": "Polvo de Perla", "Şeftali": "Melocotón", "Aktif Karbon": "Carbón Activo", "Avokado & Chia": "Aguacate y Chía",
      "Ulu Ağaç": "Árbol de Olivo", "Shea Butter": "Manteca de Karité"
    },
    el: {
      "Aktif Kömür & Karbon": "Ενεργός Άνθρακας", "Aloe Vera": "Αλόη Βέρα", "Amber": "Κεχριμπάρι", "Anti-Acne": "Κατά της Ακμής",
      "Ardıç Katranı": "Πίσσα Αρκεύθου", "Argan": "Άργκαν", "Argan Yağı": "Λάδι Άργκαν", "Avokado": "Αβοκάντο", "Aynı Sefa": "Πηγή Θεραπείας",
      "Bal": "Μέλι", "Bal & Keçi Sütü": "Μέλι & Κατσικίσιο Γάλα", "Balık": "Ψάρι", "Bebek": "Μωρό", "Biberiye": "Δεντρολίβανο", "Bıttım": "Τερέβινθος",
      "Christmas": "Χριστούγεννα", "Cilt Beyazlatma": "Λεύκανση Δέρματος", "Cilt Beyazlatıcı": "Λευκαντικό Δέρματος", "Damla Sakızı": "Μαστίχα",
      "Defne": "Δάφνη", "Defne & Badem Yağı": "Δάφνη & Λάδι Αμυγδάλου", "Dilek": "Ευχή", "Elma": "Μήλο", "Eşek Sütü": "Γάλα Γαϊδούρας",
      "Eşek Sütü & Bal": "Γάλα Γαϊδούρας & Μέλι", "Gül": "Τριαντάφυλλο", "Hamam": "Χαμάμ", "Himalaya Tuzu": "Αλάτι Ιμαλαΐων",
      "Hindistan Cevizi": "Καρύδα", "Hyaralonik Asit": "Υαλουρονικό Οξύ", "Isırgan": "Τσουκνίδα", "Kahve": "Καφές", "Karpuz": "Καρπούζι",
      "Kayısı": "Βερίκοκο", "Kefir": "Κεφίρ", "Keçi Sütü": "Κατσικίσιο Γάλα", "Kil": "Άργιλος", "Kiraz": "Κεράσι",
      "Kojik Asit & Pirinç": "Κοϊκό Οξύ & Ρύζι", "Kolajen": "Κολλαγόνο", "Kükürt": "Θειάφι", "Lavanta": "Λεβάντα", "Limon": "Λεμόνι",
      "Limon & Portakal": "Λεμόνι & Πορτοκάλι", "Love You": "Σ'Αγαπώ", "Makademya": "Μακαντάμια", "Mandalina": "Μανταρίνι", "Mango": "Μάνγκο",
      "Menthol": "Μενθόλη", "Misk": "Μόσχος", "Misk & Amber": "Μόσχος & Κεχριμπάρι", "Misk Tahara": "Μόσχος Τάχαρα", "Mor Reyhan": "Μωβ Βασιλικός",
      "Nar": "Ρόδι", "Nazar": "Μάτι", "Nemlendirici Kremli": "Ενυδατική Κρέμα", "Okyanus": "Ωκεανός", "Orkide": "Ορχιδέα",
      "Orman Meyvesi": "Δασικά Φρούτα", "Oud": "Ούντ", "Papatya": "Χαμομήλι", "Pirinç": "Ρύζι", "Q10 Yaşlanma Karşıtı": "Q10 Κατά της Γήρανσης",
      "Ruşur Taşlı": "Ελαφρόπετρα", "Ruşur Taşı": "Ελαφρόπετρα", "Safran": "Ζαφορά", "Salatalık": "Αγγούρι", "Salyangoz": "Σαλιγκάρι",
      "Sarımsak": "Σκόρδο", "Saç Bakım": "Περιποίηση Μαλλιών", "Siyah Üzüm Çekirdeği": "Σπόρος Μαύρου Σταφυλιού", "Tropikal": "Τροπικό",
      "Türk Hamamı": "Τουρκικό Χαμάμ", "Türk Hamamı & Pirinç Yağı": "Τουρκικό Χαμάμ & Λάδι Ρυζιού", "Ud": "Ούντ", "Vanilya": "Βανίλια",
      "Vitamin E": "Βιταμίνη Ε", "Yosun": "Φύκια", "Yılan Yağlı": "Λάδι Φιδιού", "Yılan Yağı": "Λάδι Φιδιού", "Zerdeçal": "Κουρκουμάς",
      "Zeytin": "Ελιά", "Zeytin Yapraklı": "Φύλλο Ελιάς", "Zeytinyağlı": "Με Ελαιόλαδο", "Zeytinyağı": "Ελαιόλαδο",
      "Çay Ağacı": "Δέντρο Τσαγιού", "Çilek": "Φράουλα", "Çörek Otu": "Μαυροκούκκι", "Çörekotu": "Μαυροκούκκι", "İhram": "Ιχράμ",
      "İnci Tozu": "Σκόνη Μαργαριταριού", "Şeftali": "Ροδάκινο", "Aktif Karbon": "Ενεργός Άνθρακας", "Avokado & Chia": "Αβοκάντο & Τσία",
      "Ulu Ağaç": "Δέντρο Ελιάς", "Shea Butter": "Βούτυρο Καριτέ"
    },
    fr: {
      "Aktif Kömür & Karbon": "Charbon Actif", "Aloe Vera": "Aloe Vera", "Amber": "Ambre", "Anti-Acne": "Anti-Acné",
      "Ardıç Katranı": "Goudron de Genévrier", "Argan": "Argan", "Argan Yağı": "Huile d'Argan", "Avokado": "Avocat", "Aynı Sefa": "Source de Guérison",
      "Bal": "Miel", "Bal & Keçi Sütü": "Miel & Lait de Chèvre", "Balık": "Poisson", "Bebek": "Bébé", "Biberiye": "Romarin", "Bıttım": "Térébinthe",
      "Christmas": "Noël", "Cilt Beyazlatma": "Éclaircissant pour la Peau", "Cilt Beyazlatıcı": "Blanchissant pour la Peau", "Damla Sakızı": "Mastic",
      "Defne": "Laurier", "Defne & Badem Yağı": "Laurier & Huile d'Amande", "Dilek": "Vœu", "Elma": "Pomme", "Eşek Sütü": "Lait d'Ânesse",
      "Eşek Sütü & Bal": "Lait d'Ânesse & Miel", "Gül": "Rose", "Hamam": "Hammam", "Himalaya Tuzu": "Sel de l'Himalaya",
      "Hindistan Cevizi": "Noix de Coco", "Hyaralonik Asit": "Acide Hyaluronique", "Isırgan": "Ortie", "Kahve": "Café", "Karpuz": "Pastèque",
      "Kayısı": "Abricot", "Kefir": "Kéfir", "Keçi Sütü": "Lait de Chèvre", "Kil": "Argile", "Kiraz": "Cerise",
      "Kojik Asit & Pirinç": "Acide Kojique & Riz", "Kolajen": "Collagène", "Kükürt": "Soufre", "Lavanta": "Lavande", "Limon": "Citron",
      "Limon & Portakal": "Citron & Orange", "Love You": "Je t'Aime", "Makademya": "Macadamia", "Mandalina": "Mandarine", "Mango": "Mangue",
      "Menthol": "Menthol", "Misk": "Musc", "Misk & Amber": "Musc & Ambre", "Misk Tahara": "Musc Tahara", "Mor Reyhan": "Basilic Pourpre",
      "Nar": "Grenade", "Nazar": "Œil Turc", "Nemlendirici Kremli": "Crème Hydratante", "Okyanus": "Océan", "Orkide": "Orchidée",
      "Orman Meyvesi": "Fruits des Bois", "Oud": "Oud", "Papatya": "Camomille", "Pirinç": "Riz", "Q10 Yaşlanma Karşıtı": "Q10 Anti-Âge",
      "Ruşur Taşlı": "Pierre Ponce", "Ruşur Taşı": "Pierre Ponce", "Safran": "Safran", "Salatalık": "Concombre", "Salyangoz": "Escargot",
      "Sarımsak": "Ail", "Saç Bakım": "Soin des Cheveux", "Siyah Üzüm Çekirdeği": "Pépin de Raisin Noir", "Tropikal": "Tropical",
      "Türk Hamamı": "Bain Turc", "Türk Hamamı & Pirinç Yağı": "Bain Turc & Huile de Riz", "Ud": "Oud", "Vanilya": "Vanille",
      "Vitamin E": "Vitamine E", "Yosun": "Algues", "Yılan Yağlı": "Huile de Serpent", "Yılan Yağı": "Huile de Serpent", "Zerdeçal": "Curcuma",
      "Zeytin": "Olive", "Zeytin Yapraklı": "Feuille d'Olivier", "Zeytinyağlı": "À l'Huile d'Olive", "Zeytinyağı": "Huile d'Olive",
      "Çay Ağacı": "Arbre à Thé", "Çilek": "Fraise", "Çörek Otu": "Nigelle", "Çörekotu": "Nigelle", "İhram": "Ihram",
      "İnci Tozu": "Poudre de Perle", "Şeftali": "Pêche", "Aktif Karbon": "Charbon Actif", "Avokado & Chia": "Avocat & Chia",
      "Ulu Ağaç": "Arbre d'Olivier", "Shea Butter": "Beurre de Karité"
    },
    ru: {
      "Aktif Kömür & Karbon": "Активированный Уголь", "Aloe Vera": "Алоэ Вера", "Amber": "Амбра", "Anti-Acne": "Против Акне",
      "Ardıç Katranı": "Можжевеловый Дёготь", "Argan": "Аргана", "Argan Yağı": "Аргановое Масло", "Avokado": "Авокадо", "Aynı Sefa": "Источник Исцеления",
      "Bal": "Мёд", "Bal & Keçi Sütü": "Мёд и Козье Молоко", "Balık": "Рыбка", "Bebek": "Детское", "Biberiye": "Розмарин", "Bıttım": "Терпентинное Дерево",
      "Christmas": "Рождество", "Cilt Beyazlatma": "Отбеливание Кожи", "Cilt Beyazlatıcı": "Осветлитель Кожи", "Damla Sakızı": "Мастика",
      "Defne": "Лавр", "Defne & Badem Yağı": "Лавр и Миндальное Масло", "Dilek": "Желание", "Elma": "Яблоко", "Eşek Sütü": "Ослиное Молоко",
      "Eşek Sütü & Bal": "Ослиное Молоко и Мёд", "Gül": "Роза", "Hamam": "Хаммам", "Himalaya Tuzu": "Гималайская Соль",
      "Hindistan Cevizi": "Кокос", "Hyaralonik Asit": "Гиалуроновая Кислота", "Isırgan": "Крапива", "Kahve": "Кофе", "Karpuz": "Арбуз",
      "Kayısı": "Абрикос", "Kefir": "Кефир", "Keçi Sütü": "Козье Молоко", "Kil": "Глина", "Kiraz": "Вишня",
      "Kojik Asit & Pirinç": "Койевая Кислота и Рис", "Kolajen": "Коллаген", "Kükürt": "Сера", "Lavanta": "Лаванда", "Limon": "Лимон",
      "Limon & Portakal": "Лимон и Апельсин", "Love You": "Люблю Тебя", "Makademya": "Макадамия", "Mandalina": "Мандарин", "Mango": "Манго",
      "Menthol": "Ментол", "Misk": "Мускус", "Misk & Amber": "Мускус и Амбра", "Misk Tahara": "Мускус Тахара", "Mor Reyhan": "Фиолетовый Базилик",
      "Nar": "Гранат", "Nazar": "Оберег от Сглаза", "Nemlendirici Kremli": "Увлажняющий Крем", "Okyanus": "Океан", "Orkide": "Орхидея",
      "Orman Meyvesi": "Лесные Ягоды", "Oud": "Уд", "Papatya": "Ромашка", "Pirinç": "Рис", "Q10 Yaşlanma Karşıtı": "Q10 Против Старения",
      "Ruşur Taşlı": "Пемза", "Ruşur Taşı": "Пемза", "Safran": "Шафран", "Salatalık": "Огурец", "Salyangoz": "Улитка",
      "Sarımsak": "Чеснок", "Saç Bakım": "Уход за Волосами", "Siyah Üzüm Çekirdeği": "Косточка Чёрного Винограда", "Tropikal": "Тропический",
      "Türk Hamamı": "Турецкая Баня", "Türk Hamamı & Pirinç Yağı": "Турецкая Баня и Рисовое Масло", "Ud": "Уд", "Vanilya": "Ваниль",
      "Vitamin E": "Витамин Е", "Yosun": "Водоросли", "Yılan Yağlı": "Змеиный Жир", "Yılan Yağı": "Змеиный Жир", "Zerdeçal": "Куркума",
      "Zeytin": "Оливка", "Zeytin Yapraklı": "Оливковый Лист", "Zeytinyağlı": "С Оливковым Маслом", "Zeytinyağı": "Оливковое Масло",
      "Çay Ağacı": "Чайное Дерево", "Çilek": "Клубника", "Çörek Otu": "Чёрный Тмин", "Çörekotu": "Чёрный Тмин", "İhram": "Ихрам",
      "İnci Tozu": "Жемчужная Пудра", "Şeftali": "Персик", "Aktif Karbon": "Активированный Уголь", "Avokado & Chia": "Авокадо и Чиа",
      "Ulu Ağaç": "Оливковое Дерево", "Shea Butter": "Масло Ши"
    },
    de: {
      "Aktif Kömür & Karbon": "Aktivkohle", "Aloe Vera": "Aloe Vera", "Amber": "Amber", "Anti-Acne": "Anti-Akne",
      "Ardıç Katranı": "Wacholderteer", "Argan": "Argan", "Argan Yağı": "Arganöl", "Avokado": "Avocado", "Aynı Sefa": "Quelle der Heilung",
      "Bal": "Honig", "Bal & Keçi Sütü": "Honig & Ziegenmilch", "Balık": "Fisch", "Bebek": "Baby", "Biberiye": "Rosmarin", "Bıttım": "Terpentinbaum",
      "Christmas": "Weihnachten", "Cilt Beyazlatma": "Hautaufhellung", "Cilt Beyazlatıcı": "Hautaufheller", "Damla Sakızı": "Mastix",
      "Defne": "Lorbeer", "Defne & Badem Yağı": "Lorbeer & Mandelöl", "Dilek": "Wunsch", "Elma": "Apfel", "Eşek Sütü": "Eselsmilch",
      "Eşek Sütü & Bal": "Eselsmilch & Honig", "Gül": "Rose", "Hamam": "Hamam", "Himalaya Tuzu": "Himalaya-Salz",
      "Hindistan Cevizi": "Kokosnuss", "Hyaralonik Asit": "Hyaluronsäure", "Isırgan": "Brennnessel", "Kahve": "Kaffee", "Karpuz": "Wassermelone",
      "Kayısı": "Aprikose", "Kefir": "Kefir", "Keçi Sütü": "Ziegenmilch", "Kil": "Tonerde", "Kiraz": "Kirsche",
      "Kojik Asit & Pirinç": "Kojisäure & Reis", "Kolajen": "Kollagen", "Kükürt": "Schwefel", "Lavanta": "Lavendel", "Limon": "Zitrone",
      "Limon & Portakal": "Zitrone & Orange", "Love You": "Ich Liebe Dich", "Makademya": "Macadamia", "Mandalina": "Mandarine", "Mango": "Mango",
      "Menthol": "Menthol", "Misk": "Moschus", "Misk & Amber": "Moschus & Amber", "Misk Tahara": "Moschus Tahara", "Mor Reyhan": "Purpurbasilikum",
      "Nar": "Granatapfel", "Nazar": "Nazar-Amulett", "Nemlendirici Kremli": "Feuchtigkeitscreme", "Okyanus": "Ozean", "Orkide": "Orchidee",
      "Orman Meyvesi": "Waldfrüchte", "Oud": "Oud", "Papatya": "Kamille", "Pirinç": "Reis", "Q10 Yaşlanma Karşıtı": "Q10 Anti-Aging",
      "Ruşur Taşlı": "Bimsstein", "Ruşur Taşı": "Bimsstein", "Safran": "Safran", "Salatalık": "Gurke", "Salyangoz": "Schnecke",
      "Sarımsak": "Knoblauch", "Saç Bakım": "Haarpflege", "Siyah Üzüm Çekirdeği": "Schwarzer Traubenkern", "Tropikal": "Tropisch",
      "Türk Hamamı": "Türkisches Bad", "Türk Hamamı & Pirinç Yağı": "Türkisches Bad & Reisöl", "Ud": "Oud", "Vanilya": "Vanille",
      "Vitamin E": "Vitamin E", "Yosun": "Algen", "Yılan Yağlı": "Schlangenöl", "Yılan Yağı": "Schlangenöl", "Zerdeçal": "Kurkuma",
      "Zeytin": "Olive", "Zeytin Yapraklı": "Olivenblatt", "Zeytinyağlı": "Mit Olivenöl", "Zeytinyağı": "Olivenöl",
      "Çay Ağacı": "Teebaum", "Çilek": "Erdbeere", "Çörek Otu": "Schwarzkümmel", "Çörekotu": "Schwarzkümmel", "İhram": "Ihram",
      "İnci Tozu": "Perlenpulver", "Şeftali": "Pfirsich", "Aktif Karbon": "Aktivkohle", "Avokado & Chia": "Avocado & Chia",
      "Ulu Ağaç": "Olivenbaum", "Shea Butter": "Sheabutter"
    }
  };

  function getLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && LANGS.some(function (l) { return l.code === saved; })) return saved;
    return "tr";
  }

  function setLang(code) {
    localStorage.setItem(STORAGE_KEY, code);
    if (typeof window.gtag === "function") {
      window.gtag("event", "language_change", { language_pref: code });
    }
    window.location.reload();
  }

  function interpolate(str, vars) {
    if (!vars) return str;
    return str.replace(/\{(\w+)\}/g, function (m, key) {
      return Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : m;
    });
  }

  function t(key, vars) {
    var lang = getLang();
    if (lang !== "tr" && UI[lang] && UI[lang][key] != null) return interpolate(UI[lang][key], vars);
    return null;
  }

  function tCat(id, field, fallback) {
    var lang = getLang();
    if (lang !== "tr" && CATEGORIES[lang] && CATEGORIES[lang][id] && CATEGORIES[lang][id][field] != null) {
      return CATEGORIES[lang][id][field];
    }
    return fallback;
  }

  function tVariant(label) {
    var lang = getLang();
    if (lang !== "tr" && VARIANTS[lang] && VARIANTS[lang][label] != null) return VARIANTS[lang][label];
    return label;
  }

  function applyStaticTranslations(root) {
    var scope = root || document;
    if (getLang() === "tr") return;
    scope.querySelectorAll("[data-i18n]").forEach(function (el) {
      var val = t(el.getAttribute("data-i18n"));
      if (val != null) el.innerHTML = val;
    });
    scope.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var val = t(el.getAttribute("data-i18n-placeholder"));
      if (val != null) el.setAttribute("placeholder", val);
    });
  }

  function buildLangSwitcher(container) {
    var current = getLang();
    var html = LANGS.map(function (l) {
      return '<button class="lang-flag' + (l.code === current ? " active" : "") + '" type="button" data-lang="' + l.code + '" title="' + l.label + '">' + l.flag + '</button>';
    }).join("");
    container.innerHTML = html;
    container.querySelectorAll(".lang-flag").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.documentElement.setAttribute("lang", getLang());
    var switcherEl = document.getElementById("lang-switcher");
    if (switcherEl) buildLangSwitcher(switcherEl);
    applyStaticTranslations(document);
  });

  window.I18N = {
    getLang: getLang,
    setLang: setLang,
    t: t,
    tCat: tCat,
    tVariant: tVariant,
    applyStaticTranslations: applyStaticTranslations
  };
})();
