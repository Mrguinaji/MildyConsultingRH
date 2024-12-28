import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MessageCircle, Star, Clock } from "lucide-react";

interface AnimatedListProps {
  items: {
    name: string;
    role: string;
    testimonial: string;
    date: string;
  }[];
  className?: string;
}

export function AnimatedList({ items, className }: AnimatedListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      }
    },
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={cn("flex flex-col gap-4", className)}
    >
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          variants={itemVariants}
          className={cn(
            "group relative overflow-hidden rounded-xl border p-6",
            "bg-gradient-to-br from-white/40 to-white/20",
            "backdrop-blur-md shadow-lg",
            "hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1",
            "transition-all duration-300",
          )}
        >
          {/* Effet de brillance au survol */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          </div>

          <div className="relative">
            {/* En-tête avec nom et rôle */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-bordeaux group-hover:text-bordeaux/90 transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <MessageCircle className="w-4 h-4 text-terre-cuite/70" />
                  <p className="text-sm text-terre-cuite/90">{item.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-or-doux" />
                ))}
              </div>
            </div>

            {/* Contenu du témoignage */}
            <p className="text-base text-gris-neutre/90 leading-relaxed mb-4">
              {item.testimonial}
            </p>

            {/* Pied avec date */}
            <div className="flex items-center gap-2 text-sm text-gris-neutre/70">
              <Clock className="w-4 h-4" />
              <time>{item.date}</time>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
} 