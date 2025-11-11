import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [calculatorData, setCalculatorData] = useState({
    type: '',
    area: '',
    service: ''
  });

  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');

  const advantages = [
    {
      icon: 'MapPin',
      title: 'Работаем по всему Краснодарскому краю',
      description: 'Геленджик, Сочи, Краснодар, Анапа, Новороссийск'
    },
    {
      icon: 'Palette',
      title: 'Авторский дизайн и ремонт «под ключ»',
      description: 'Индивидуальный подход к каждому проекту'
    },
    {
      icon: 'Shield',
      title: 'Гарантия на все виды работ',
      description: 'Официальный договор и прозрачные условия'
    },
    {
      icon: 'DollarSign',
      title: 'Фиксированная стоимость',
      description: 'Без скрытых платежей и доплат'
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'Квартира в современном стиле',
      category: 'apartment',
      style: 'modern',
      city: 'Краснодар',
      area: 85,
      image: 'https://cdn.poehali.dev/projects/249bcc05-b9e1-4424-ad17-f8228415d084/files/9121fdcb-3038-48ea-8902-20203ef82be1.jpg',
      description: 'Светлая просторная квартира с минималистичным дизайном'
    },
    {
      id: 2,
      title: 'Кухня премиум-класса',
      category: 'house',
      style: 'modern',
      city: 'Сочи',
      area: 25,
      image: 'https://cdn.poehali.dev/projects/249bcc05-b9e1-4424-ad17-f8228415d084/files/d82434f0-e45a-44d0-9b7e-a04d84f6e510.jpg',
      description: 'Кухня с дорогими материалами и современной техникой'
    },
    {
      id: 3,
      title: 'Спальня в скандинавском стиле',
      category: 'apartment',
      style: 'scandinavian',
      city: 'Геленджик',
      area: 20,
      image: 'https://cdn.poehali.dev/projects/249bcc05-b9e1-4424-ad17-f8228415d084/files/74cfeab4-fd3b-4185-8c01-14a5633ff0b0.jpg',
      description: 'Уютная спальня в светлых тонах с натуральными материалами'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const calculatePrice = () => {
    const { type, area, service } = calculatorData;
    
    if (!type || !area || !service) {
      toast({
        title: 'Заполните все поля',
        description: 'Для расчёта стоимости необходимо выбрать все параметры',
        variant: 'destructive'
      });
      return;
    }

    const prices: { [key: string]: number } = {
      'design': 3500,
      'cosmetic': 5500,
      'capital': 9000
    };

    const areaNum = parseFloat(area);
    const basePrice = prices[service] * areaNum;
    
    const coefficient = type === 'commercial' ? 1.3 : 1;
    const totalPrice = basePrice * coefficient;

    toast({
      title: 'Расчёт готов!',
      description: `Ориентировочная стоимость: ${totalPrice.toLocaleString('ru-RU')} ₽`,
      duration: 5000
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена!',
      description: 'Мы свяжемся с вами в ближайшее время',
    });
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Home" size={28} className="text-primary" />
            <span className="text-2xl font-bold text-primary">Атмосфера</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="text-foreground hover:text-primary transition">Услуги</a>
            <a href="#portfolio" className="text-foreground hover:text-primary transition">Портфолио</a>
            <a href="#calculator" className="text-foreground hover:text-primary transition">Цены</a>
            <a href="#contact" className="text-foreground hover:text-primary transition">Контакты</a>
          </nav>
          <Button className="hidden md:inline-flex">
            <Icon name="Phone" size={16} className="mr-2" />
            Позвонить
          </Button>
        </div>
      </header>

      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/249bcc05-b9e1-4424-ad17-f8228415d084/files/9121fdcb-3038-48ea-8902-20203ef82be1.jpg')`,
            filter: 'brightness(0.6)'
          }}
        />
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Дизайн и ремонт<br />по всему Краснодарскому краю
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Авторские проекты и качественный ремонт «под ключ»
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90">
              <Icon name="Palette" size={20} className="mr-2" />
              Заказать дизайн-проект
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary">
              <Icon name="Calculator" size={20} className="mr-2" />
              Рассчитать стоимость
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Наши преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow animate-scale-in">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={advantage.icon} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{advantage.title}</h3>
                  <p className="text-muted-foreground">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Услуги</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Полный спектр работ от дизайна до финальной отделки
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Palette" size={28} className="text-primary" />
                  <h3 className="text-2xl font-bold">Дизайн интерьера</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-secondary mt-0.5" />
                    <span>Разработка концепции и 3D-визуализация</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-secondary mt-0.5" />
                    <span>Рабочая документация</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-secondary mt-0.5" />
                    <span>Авторский надзор</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Badge variant="secondary" className="text-lg py-1 px-3">от 3 500 ₽/м²</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Wrench" size={28} className="text-primary" />
                  <h3 className="text-2xl font-bold">Ремонтные работы</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-secondary mt-0.5" />
                    <span>Капитальный и косметический ремонт</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-secondary mt-0.5" />
                    <span>Электромонтаж и сантехника</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-secondary mt-0.5" />
                    <span>Полный цикл «под ключ»</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Badge variant="secondary" className="text-lg py-1 px-3">от 5 500 ₽/м²</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Портфолио</h2>
          <p className="text-center text-muted-foreground mb-8 text-lg">
            Реализованные проекты наших клиентов
          </p>
          
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              Все проекты
            </Button>
            <Button 
              variant={filter === 'apartment' ? 'default' : 'outline'}
              onClick={() => setFilter('apartment')}
            >
              Квартиры
            </Button>
            <Button 
              variant={filter === 'house' ? 'default' : 'outline'}
              onClick={() => setFilter('house')}
            >
              Дома
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Dialog key={project.id}>
                <DialogTrigger asChild>
                  <Card 
                    className="cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Icon name="MapPin" size={16} />
                        <span>{project.city}</span>
                        <span>•</span>
                        <span>{project.area} м²</span>
                      </div>
                      <p className="text-muted-foreground">{project.description}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>{project.title}</DialogTitle>
                  </DialogHeader>
                  <div>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full rounded-lg mb-4"
                    />
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="MapPin" size={18} />
                        <span>{project.city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Maximize" size={18} />
                        <span>Площадь: {project.area} м²</span>
                      </div>
                      <p className="text-lg">{project.description}</p>
                      <Button className="w-full mt-4">
                        <Icon name="Phone" size={18} className="mr-2" />
                        Заказать похожий проект
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Калькулятор стоимости</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Узнайте ориентировочную стоимость вашего проекта
          </p>
          
          <Card className="max-w-2xl mx-auto shadow-xl">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="type">Тип объекта</Label>
                  <Select value={calculatorData.type} onValueChange={(value) => setCalculatorData({...calculatorData, type: value})}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Выберите тип объекта" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Жилое помещение</SelectItem>
                      <SelectItem value="commercial">Коммерческое помещение</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="area">Площадь (м²)</Label>
                  <Input 
                    id="area"
                    type="number" 
                    placeholder="Введите площадь"
                    value={calculatorData.area}
                    onChange={(e) => setCalculatorData({...calculatorData, area: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="service">Вид услуги</Label>
                  <Select value={calculatorData.service} onValueChange={(value) => setCalculatorData({...calculatorData, service: value})}>
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Дизайн интерьера (3 500 ₽/м²)</SelectItem>
                      <SelectItem value="cosmetic">Косметический ремонт (5 500 ₽/м²)</SelectItem>
                      <SelectItem value="capital">Капитальный ремонт (9 000 ₽/м²)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full" size="lg" onClick={calculatePrice}>
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать стоимость
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contact" className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Получить консультацию</h2>
            <p className="text-center text-primary-foreground/90 mb-12 text-lg">
              Оставьте заявку, и мы свяжемся с вами в течение 15 минут
            </p>
            
            <Card className="shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input id="name" placeholder="Иван Иванов" required />
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
                  </div>

                  <div>
                    <Label htmlFor="service-type">Интересующая услуга</Label>
                    <Select>
                      <SelectTrigger id="service-type">
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="design">Дизайн интерьера</SelectItem>
                        <SelectItem value="repair">Ремонт</SelectItem>
                        <SelectItem value="both">Дизайн + Ремонт</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Комментарий</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Расскажите о вашем проекте..."
                      className="min-h-24"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Home" size={28} className="text-secondary" />
                <span className="text-2xl font-bold">Атмосфера</span>
              </div>
              <p className="text-background/80">
                Студия дизайна и ремонта<br />
                по всему Краснодарскому краю
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Контакты</h3>
              <div className="space-y-3 text-background/80">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  <span>+7 (861) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={18} />
                  <span>info@atmosfera-design.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={18} />
                  <span>Пн–Сб 9:00–19:00</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">География работы</h3>
              <p className="text-background/80">
                Краснодар, Сочи, Геленджик,<br />
                Анапа, Новороссийск<br />
                и весь Краснодарский край
              </p>
            </div>
          </div>
          
          <div className="border-t border-background/20 pt-8 text-center text-background/60">
            <p>&copy; 2025 Студия «Атмосфера». Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
