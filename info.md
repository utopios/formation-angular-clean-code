## Tools
- git (avec repos github)
- vscode
- docker
- nodejs
- cli angular


## Command pour démarrer un conteneur docker
docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest

## Structure de base pour la correction orderapp

src/
├── app/
│   ├── components/
│   │   ├── customer/
│   │   │   ├── customer.component.ts
│   │   │   ├── customer.component.html
│   │   │   ├── customer.component.css
│   │   ├── product/
│   │   │   ├── product.component.ts
│   │   │   ├── product.component.html
│   │   │   ├── product.component.css
│   │   ├── order/
│   │   │   ├── order.component.ts
│   │   │   ├── order.component.html
│   │   │   ├── order.component.css
│   │   ├── cart/
│   │   │   ├── cart.component.ts
│   │   │   ├── cart.component.html
│   │   │   ├── cart.component.css
│   │   ├── payment/
│   │   │   ├── payment.component.ts
│   │   │   ├── payment.component.html
│   │   │   ├── payment.component.css
│   ├── services/
│   │   ├── customer.service.ts
│   │   ├── product.service.ts
│   │   ├── order.service.ts
│   │   ├── cart.service.ts
│   │   ├── payment.service.ts
│   ├── models/
│   │   ├── customer.model.ts
│   │   ├── product.model.ts
│   │   ├── order.model.ts
│   │   ├── cart.model.ts
│   │   ├── payment.model.ts
│   ├── validators/
│   │   ├── customer.validator.ts
│   │   ├── product.validator.ts
│   ├── app.module.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
└──