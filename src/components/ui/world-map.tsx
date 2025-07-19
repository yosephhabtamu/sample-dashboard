"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

import { useTheme } from "next-themes";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export default function WorldMap({
  dots = [
    // North America (9 dots)
    {
      "start": { "lat": 40.7128, "lng": -74.0060 }, // New York City
      "end": { "lat": 34.0522, "lng": -118.2437 }  // Los Angeles
    },
    {
      "start": { "lat": 41.8781, "lng": -87.6298 }, // Chicago
      "end": { "lat": 33.7488, "lng": -84.3877 }   // Atlanta
    },
    {
      "start": { "lat": 45.4215, "lng": -75.6972 }, // Ottawa
      "end": { "lat": 51.0447, "lng": -114.0719 }  // Calgary
    },
    {
      "start": { "lat": 19.4326, "lng": -99.1332 }, // Mexico City
      "end": { "lat": 25.6866, "lng": -100.3161 }  // Monterrey
    },
    {
      "start": { "lat": 38.9072, "lng": -77.0369 }, // Washington D.C.
      "end": { "lat": 29.7604, "lng": -95.3698 }   // Houston
    },
    {
      "start": { "lat": 39.9526, "lng": -75.1652 }, // Philadelphia
      "end": { "lat": 42.3601, "lng": -71.0589 }   // Boston
    },
    {
      "start": { "lat": 34.0522, "lng": -118.2437 }, // Los Angeles
      "end": { "lat": 20.6597, "lng": -103.3496 }  // Guadalajara
    },
    {
      "start": { "lat": 40.7128, "lng": -74.0060 }, // New York City
      "end": { "lat": 45.5017, "lng": -73.5673 }   // Montreal
    },
    {
      "start": { "lat": 32.7157, "lng": -117.1611 }, // San Diego
      "end": { "lat": 37.7749, "lng": -122.4194 }  // San Francisco
    },
  
    // Europe (5 dots)
    {
      "start": { "lat": 51.5074, "lng": -0.1278 }, // London
      "end": { "lat": 48.8566, "lng": 2.3522 }     // Paris
    },
    {
      "start": { "lat": 52.5200, "lng": 13.4050 }, // Berlin
      "end": { "lat": 41.9028, "lng": 12.4964 }    // Rome
    },
    {
      "start": { "lat": 40.4168, "lng": -3.7038 }, // Madrid
      "end": { "lat": 38.7223, "lng": -9.1393 }    // Lisbon
    },
    {
      "start": { "lat": 59.3293, "lng": 18.0686 }, // Stockholm
      "end": { "lat": 55.6761, "lng": 12.5683 }    // Copenhagen
    },
    {
      "start": { "lat": 47.4979, "lng": 19.0402 }, // Budapest
      "end": { "lat": 48.2082, "lng": 16.3738 }    // Vienna
    },
  
    // Japan & China (2 dots)
    {
      "start": { "lat": 35.6895, "lng": 139.6917 }, // Tokyo
      "end": { "lat": 34.6937, "lng": 135.5022 }   // Osaka
    },
    {
      "start": { "lat": 39.9042, "lng": 116.4074 }, // Beijing
      "end": { "lat": 31.2304, "lng": 121.4737 }   // Shanghai
    },
  
    // Australia (2 dots)
    {
      "start": { "lat": -33.8688, "lng": 151.2093 }, // Sydney
      "end": { "lat": -37.8136, "lng": 144.9631 }  // Melbourne
    },
    {
      "start": { "lat": -31.9505, "lng": 115.8605 }, // Perth
      "end": { "lat": -27.4698, "lng": 153.0251 }  // Brisbane
    },
  
    // South Africa & Ethiopia (2 dots)
    {
      "start": { "lat": -33.9249, "lng": 18.4241 }, // Cape Town
      "end": { "lat": -26.2041, "lng": 28.0473 }   // Johannesburg
    },
    {
      "start": { "lat": 9.0054, "lng": 38.7636 },  // Addis Ababa
      "end": { "lat": -1.2921, "lng": 36.8219 }    // Nairobi
    }
  ],
  lineColor = "#432dd7",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const { theme } = useTheme();

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#432dd770",
    shape: "circle",
    backgroundColor: theme === "dark" ? "black" : "white",
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full aspect-[2/1] dark:bg-black bg-white rounded-lg  relative font-sans">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.5 * i,
                  ease: "easeOut",
                }}
                key={`start-upper-${i}`}
              ></motion.path>
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
