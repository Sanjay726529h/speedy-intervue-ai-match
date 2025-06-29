
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Users, Brain, BarChart3, Clock, Shield } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI Resume Ranking & Matching",
      description: "Advanced NLP algorithms analyze and rank candidates based on job requirements with 95% accuracy."
    },
    {
      icon: Users,
      title: "Mock Interviews & AI Feedback",
      description: "Practice with AI-powered mock interviews and receive detailed feedback on technical and soft skills."
    },
    {
      icon: CheckCircle,
      title: "Human-Led Expert Interviews",
      description: "Connect with industry experts for comprehensive technical assessments and cultural fit evaluation."
    },
    {
      icon: BarChart3,
      title: "Performance Reports & Insights",
      description: "Detailed analytics and reporting to help make data-driven hiring decisions."
    }
  ];

  const benefits = [
    "Reduce hiring time by 70%",
    "Improve candidate quality score by 85%",
    "Eliminate bias with AI-driven screening",
    "Scale interviews globally with expert network"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-900 mb-6 leading-tight">
              Revolutionizing Tech Hiring
            </h1>
            <p className="text-xl md:text-2xl text-accent-600 font-semibold mb-4">
              AI Powered Interviews; Human Led Excellence!
            </p>
            <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
              Streamline your technical recruitment with our intelligent platform that combines 
              cutting-edge AI technology with expert human insights to find the perfect candidates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/signup')}
                className="bg-primary-800 hover:bg-primary-900 text-white px-8 py-4 text-lg font-semibold"
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-primary-300 text-primary-700 hover:bg-primary-50 px-8 py-4 text-lg font-semibold"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              Powerful Features for Modern Hiring
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our comprehensive platform provides everything you need to transform your recruitment process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-slate-50">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-accent-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-primary-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Transform Your Hiring Process
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Join hundreds of companies that have revolutionized their recruitment with SpeedyIntervue
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-accent-400 flex-shrink-0" />
                    <span className="text-lg text-primary-100">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400 mb-2">70%</div>
                <div className="text-primary-200">Faster Hiring</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400 mb-2">95%</div>
                <div className="text-primary-200">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400 mb-2">10k+</div>
                <div className="text-primary-200">Interviews Conducted</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400 mb-2">500+</div>
                <div className="text-primary-200">Companies Trust Us</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accent-600 to-accent-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Revolutionize Your Hiring?
          </h2>
          <p className="text-xl mb-8 text-accent-100">
            Start your free trial today and experience the future of technical recruitment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-white text-accent-700 hover:bg-accent-50 px-8 py-4 text-lg font-semibold"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-accent-700 px-8 py-4 text-lg font-semibold"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">SpeedyIntervue</h3>
              <p className="text-primary-200 mb-4">
                AI-powered technical recruitment platform that connects companies with top talent through intelligent screening and expert interviews.
              </p>
              <div className="flex space-x-4">
                <Shield className="h-5 w-5 text-accent-400" />
                <span className="text-sm text-primary-200">GDPR Compliant</span>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-primary-200">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-primary-200">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-800 mt-8 pt-8 text-center text-primary-300">
            <p>&copy; 2024 SpeedyIntervue. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
