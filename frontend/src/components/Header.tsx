import { motion } from "motion/react";
import { Home, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  onPricingClick?: () => void;
  onFeaturesClick?: () => void;
  onHomeClick?: () => void;
}

export function Header({ onPricingClick, onFeaturesClick, onHomeClick }: HeaderProps = {}) {
  return (
    <motion.header 
      className="glass backdrop-blur-lg border-b border-border/50 sticky top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.button 
            onClick={onHomeClick}
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="w-8 h-8 bg-gradient-to-br from-primary to-info rounded-lg flex items-center justify-center shadow-md"
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Home className="h-4 w-4 text-white" />
              </motion.div>
              <h1 className="text-xl font-semibold">
                <span className="bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                  ServiceNegotiator
                </span>
              </h1>
            </div>
          </motion.button>
          
          <motion.nav 
            className="hidden md:flex space-x-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.button 
              onClick={onFeaturesClick}
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              How it Works
            </motion.button>
            <motion.button 
              onClick={onPricingClick}
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Pricing
            </motion.button>
          </motion.nav>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" className="backdrop-blur-sm hover:bg-primary/5">
              <Sparkles className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}