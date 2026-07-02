"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "leaflet/dist/leaflet.css";

interface Lead {
  id: string;
  name: string;
  phone: string;
  property: string;
  status: "new" | "contacted" | "negotiating";
}

interface Lot {
  id: string;
  name: string;
  area: string;
  status: "disponible" | "reservado" | "vendido";
  coordinates: number[][];
}

const INITIAL_LOTS: Lot[] = [
  { id: "L01", name: "Terreno Barrio Histórico", area: "600 m²", status: "vendido", coordinates: [[-34.4728, -57.8520], [-34.4728, -57.8510], [-34.4735, -57.8510], [-34.4735, -57.8520]] },
  { id: "L02", name: "Oficina Zona Centro", area: "120 m²", status: "disponible", coordinates: [[-34.4715, -57.8445], [-34.4705, -57.8445], [-34.4705, -57.8435], [-34.4715, -57.8435]] },
  { id: "L03", name: "Local Comercial Centro", area: "250 m²", status: "reservado", coordinates: [[-34.4695, -57.8465], [-34.4690, -57.8465], [-34.4690, -57.8455], [-34.4695, -57.8455]] },
  { id: "L04", name: "Quinta Balneario Ferrando", area: "1500 m²", status: "disponible", coordinates: [[-34.4730, -57.8240], [-34.4710, -57.8240], [-34.4710, -57.8210], [-34.4730, -57.8210]] },
  { id: "L05", name: "Lote en el Campo", area: "3200 m²", status: "disponible", coordinates: [[-34.4550, -57.8100], [-34.4535, -57.8100], [-34.4535, -57.8080], [-34.4550, -57.8080]] },
];

interface MockContact {
  name: string;
  email: string;
  phone: string;
  tags: { text: string; color: string; bg: string }[];
  time: string;
}

const AUTOMATION_MOCK_CONTACTS: MockContact[] = [
  { name: "Lucas García", email: "lucas.garcia@ejemplo.com", phone: "+54 9 11 4983-2918", time: "Hace 2 min", tags: [{ text: "Portal Web", color: "#3b82f6", bg: "rgba(59,130,246,0.12)" }, { text: "Interés Alto", color: "#10b981", bg: "rgba(16,185,129,0.12)" }] },
  { name: "Valentina Rossi", email: "valentina.rossi@ejemplo.com", phone: "+54 9 341 592-1200", time: "Hace 5 min", tags: [{ text: "WhatsApp", color: "#10b981", bg: "rgba(16,185,129,0.12)" }, { text: "Fase Inicial", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" }] },
  { name: "Mateo Fernández", email: "mateo.fernandez@ejemplo.com", phone: "+54 9 261 384-9021", time: "Hace 12 min", tags: [{ text: "ZonaProp", color: "#06b6d4", bg: "rgba(6,182,212,0.12)" }] },
  { name: "Sofía Silva", email: "sofia.silva@ejemplo.com", phone: "+54 9 11 6733-1122", time: "Hace 18 min", tags: [{ text: "Portal Web", color: "#3b82f6", bg: "rgba(59,130,246,0.12)" }, { text: "Nueva Consulta", color: "#ef4444", bg: "rgba(239,68,68,0.12)" }] },
  { name: "Bautista Díaz", email: "bautista.diaz@ejemplo.com", phone: "+54 9 351 772-8811", time: "Hace 25 min", tags: [{ text: "MercadoLibre", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" }, { text: "Loteo", color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" }] },
  { name: "Camila Benítez", email: "camila.benitez@ejemplo.com", phone: "+54 9 11 5029-4455", time: "Hace 40 min", tags: [{ text: "WhatsApp", color: "#10b981", bg: "rgba(16,185,129,0.12)" }] },
  { name: "Thiago Romero", email: "thiago.romero@ejemplo.com", phone: "+54 9 11 3822-1982", time: "Hace 1 hora", tags: [{ text: "ZonaProp", color: "#06b6d4", bg: "rgba(6,182,212,0.12)" }, { text: "Interés Alto", color: "#10b981", bg: "rgba(16,185,129,0.12)" }] },
  { name: "Martina Álvarez", email: "martina.alvarez@ejemplo.com", phone: "+54 9 261 492-2931", time: "Hace 2 horas", tags: [{ text: "Portal Web", color: "#3b82f6", bg: "rgba(59,130,246,0.12)" }] },
  { name: "Joaquín Torres", email: "joaquin.torres@ejemplo.com", phone: "+54 9 341 682-1922", time: "Hace 3 horas", tags: [{ text: "WhatsApp", color: "#10b981", bg: "rgba(16,185,129,0.12)" }, { text: "Revisado", color: "#6b7280", bg: "rgba(107,114,128,0.12)" }] },
  { name: "Emma Ruiz", email: "emma.ruiz@ejemplo.com", phone: "+54 9 11 2049-9028", time: "Hace 4 horas", tags: [{ text: "MercadoLibre", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" }] },
  { name: "Benjamín Castro", email: "benjamin.castro@ejemplo.com", phone: "+54 9 11 8734-1120", time: "Hace 6 horas", tags: [{ text: "Portal Web", color: "#3b82f6", bg: "rgba(59,130,246,0.12)" }] },
  { name: "Delfina Medina", email: "delfina.medina@ejemplo.com", phone: "+54 9 351 902-1234", time: "Hace 8 horas", tags: [{ text: "ZonaProp", color: "#06b6d4", bg: "rgba(6,182,212,0.12)" }] },
  { name: "Juan Cruz Gómez", email: "juancruz.gomez@ejemplo.com", phone: "+54 9 11 4099-2819", time: "Hace 12 horas", tags: [{ text: "WhatsApp", color: "#10b981", bg: "rgba(16,185,129,0.12)" }, { text: "Interés Alto", color: "#10b981", bg: "rgba(16,185,129,0.12)" }] },
  { name: "Olivia Herrera", email: "olivia.herrera@ejemplo.com", phone: "+54 9 11 3290-4822", time: "Hace 1 día", tags: [{ text: "MercadoLibre", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" }] },
  { name: "Tomás Pereyra", email: "tomas.pereyra@ejemplo.com", phone: "+54 9 261 883-9122", time: "Hace 2 días", tags: [{ text: "WhatsApp", color: "#10b981", bg: "rgba(16,185,129,0.12)" }] },
];

export default function AdminDemo() {
  const [activeTab, setActiveTab] = useState<"crm-dashboard" | "crm-kanban" | "satellite" | "whatsapp" | "feature-request">("crm-dashboard");

  // Feature request form states
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [featureTitle, setFeatureTitle] = useState("");
  const [featureDesc, setFeatureDesc] = useState("");
  const [featurePriority, setFeaturePriority] = useState("media");
  const [featureSubmitted, setFeatureSubmitted] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<{ label: string; value: number; date: string; x: number; y: number } | null>(null);

  // Daily Discretized interactive chart data
  const chartData = [
    { label: "Lun", value: 3, date: "Lun 25/06" },
    { label: "Mar", value: 8, date: "Mar 26/06" },
    { label: "Mié", value: 5, date: "Mié 27/06" },
    { label: "Jue", value: 12, date: "Jue 28/06" },
    { label: "Vie", value: 7, date: "Vie 29/06" },
    { label: "Sáb", value: 15, date: "Sáb 30/06" },
    { label: "Dom", value: 10, date: "Dom 01/07" }
  ];

  const width = 600;
  const height = 200;
  const paddingLeft = 40;
  const paddingRight = 40;
  const paddingTop = 20;
  const paddingBottom = 30;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const maxVal = 16;

  const points = chartData.map((d, i) => {
    const x = paddingLeft + (i / (chartData.length - 1)) * chartWidth;
    const y = (height - paddingBottom) - (d.value / maxVal) * chartHeight;
    return { ...d, x, y };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;

  // CRM Kanban state
  const [leads, setLeads] = useState<Lead[]>([
    { id: "1", name: "Carlos Mendoza", phone: "+54 11 5829-1922", property: "Lote 45 - Bosques de Canning", status: "new" },
    { id: "2", name: "María Eugenia Paz", phone: "+54 351 928-1122", property: "Departamento 2 Dorm - Nueva Córdoba", status: "new" },
    { id: "3", name: "Martín Rodríguez", phone: "+54 11 3844-2911", property: "Fracción de Campo 12 Ha - Cañuelas", status: "contacted" },
    { id: "4", name: "Sofía Altieri", phone: "+54 261 482-1988", property: "Casa 4 Dorm - Lomas de Chacras", status: "contacted" },
    { id: "5", name: "Ignacio Casal", phone: "+54 11 9028-3388", property: "Lote 12 - Costa Esmeralda", status: "negotiating" },
  ]);

  // Satellite Editor state
  const [lots, setLots] = useState<Lot[]>(INITIAL_LOTS);
  const [selectedLot, setSelectedLot] = useState<Lot | null>(INITIAL_LOTS[1]);
  const [hoveredLotId, setHoveredLotId] = useState<string | null>(null);
  const [lotEditorTab, setLotEditorTab] = useState<"inventory" | "details">("inventory");

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "light") {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
  };

  const handleFeatureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeatureSubmitted(true);
  };

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const polygonsRef = useRef<{[key: string]: any}>({});
  const markersRef = useRef<{[key: string]: any}>({});

  // Centroid calculation helper
  const getCentroid = (coords: number[][]) => {
    let latSum = 0;
    let lngSum = 0;
    coords.forEach(([lat, lng]) => {
      latSum += lat;
      lngSum += lng;
    });
    return [latSum / coords.length, lngSum / coords.length];
  };

  // Initialize Leaflet Map Centered in Colonia del Sacramento
  useEffect(() => {
    if (activeTab !== "satellite") {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        polygonsRef.current = {};
        markersRef.current = {};
      }
      return;
    }

    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    // Load Leaflet dynamically to prevent SSR failures
    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current || mapRef.current) return;

      // Center in Colonia del Sacramento coordinates
      const map = L.map(mapContainerRef.current).setView([-34.471, -57.838], 14);
      mapRef.current = map;

      // Google Hybrid Satellite Tile Layer
      L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        attribution: 'Map data &copy; Google Maps',
        maxZoom: 20
      }).addTo(map);

      // Plot polygons and glowing custom markers
      lots.forEach((lot) => {
        // 1. Polygon layer
        const poly = L.polygon(lot.coordinates as L.LatLngExpression[], {
          color: lot.status === "disponible" ? "#10b981" : lot.status === "reservado" ? "#f59e0b" : "#ef4444",
          fillColor: lot.status === "disponible" ? "#10b981" : lot.status === "reservado" ? "#f59e0b" : "#ef4444",
          fillOpacity: 0.25,
          weight: 1.5
        }).addTo(map);

        poly.bindTooltip(`${lot.id} - ${lot.name} (${lot.area})`, {
          permanent: false,
          direction: "top"
        });

        // 2. Custom glowing Pin Icon at Centroid
        const centroid = getCentroid(lot.coordinates);
        const pinIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div class="pin-container" style="
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 30px;
              height: 30px;
              background: ${theme === 'light' ? '#ffffff' : 'rgba(8, 12, 22, 0.95)'};
              border: 2px solid ${lot.status === 'disponible' ? '#10b981' : lot.status === 'reservado' ? '#f59e0b' : '#ef4444'};
              border-radius: 50%;
              box-shadow: ${theme === 'light' ? '0 2px 8px rgba(0,0,0,0.15)' : '0 0 8px rgba(0,0,0,0.5)'};
              transform-origin: bottom center;
              transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            ">
              <span style="
                font-size: 9px;
                font-weight: 800;
                color: ${theme === 'light' ? '#0f172a' : '#ffffff'};
              ">${lot.id}</span>
              <div class="pin-arrow" style="
                position: absolute;
                bottom: -6px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 6px solid ${lot.status === 'disponible' ? '#10b981' : lot.status === 'reservado' ? '#f59e0b' : '#ef4444'};
                transition: all 0.2s ease;
              "></div>
            </div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 30]
        });

        const marker = L.marker(centroid as L.LatLngTuple, { icon: pinIcon }).addTo(map);

        // Bind tooltip to marker too
        marker.bindTooltip(`${lot.id} - ${lot.name} (${lot.area})`, {
          permanent: false,
          direction: "top"
        });

        // Event hooks for both polygon and marker
        const onSelect = () => {
          setSelectedLot(lot);
          setLotEditorTab("details");
        };
        const onHover = () => setHoveredLotId(lot.id);
        const onLeave = () => setHoveredLotId(null);

        poly.on("click", onSelect);
        poly.on("mouseover", onHover);
        poly.on("mouseout", onLeave);

        marker.on("click", onSelect);
        marker.on("mouseover", onHover);
        marker.on("mouseout", onLeave);

        polygonsRef.current[lot.id] = poly;
        markersRef.current[lot.id] = marker;
      });
    });

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        polygonsRef.current = {};
        markersRef.current = {};
      }
    };
  }, [activeTab, theme]);

  // Synchronize map styles and marker transforms when state changes
  useEffect(() => {
    if (activeTab !== "satellite") return;

    Object.keys(polygonsRef.current).forEach((lotId) => {
      const poly = polygonsRef.current[lotId];
      const marker = markersRef.current[lotId];
      const lot = lots.find((l) => l.id === lotId);
      if (!poly || !lot) return;

      const isSelected = selectedLot?.id === lotId;
      const isHovered = hoveredLotId === lotId;

      // Update polygon coordinates dynamically
      poly.setLatLngs(lot.coordinates as L.LatLngExpression[]);

      // Update polygon styles
      poly.setStyle({
        weight: isSelected ? 3 : isHovered ? 2.5 : 1.5,
        color: isSelected ? "#ffffff" : isHovered ? "rgba(255, 255, 255, 0.8)" : (lot.status === "disponible" ? "#10b981" : lot.status === "reservado" ? "#f59e0b" : "#ef4444"),
        fillColor: lot.status === "disponible" ? "#10b981" : lot.status === "reservado" ? "#f59e0b" : "#ef4444",
        fillOpacity: isSelected ? 0.45 : isHovered ? 0.35 : 0.25
      });

      if (isSelected || isHovered) {
        poly.bringToFront();
      }

      // Update custom marker elements styling dynamically (scaling/glows)
      if (marker) {
        const el = marker.getElement();
        if (el) {
          const pinContainer = el.querySelector('.pin-container') as HTMLElement;
          const pinArrow = el.querySelector('.pin-arrow') as HTMLElement;
          const statusColor = lot.status === "disponible" ? "#10b981" : lot.status === "reservado" ? "#f59e0b" : "#ef4444";

          if (pinContainer) {
            if (isSelected) {
              pinContainer.style.transform = "scale(1.25) translateY(-4px)";
              pinContainer.style.borderColor = "#ffffff";
              pinContainer.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.8)";
            } else if (isHovered) {
              pinContainer.style.transform = "scale(1.15) translateY(-2px)";
              pinContainer.style.borderColor = "rgba(255, 255, 255, 0.8)";
              pinContainer.style.boxShadow = "0 0 12px rgba(59, 130, 246, 0.8)";
            } else {
              pinContainer.style.transform = "scale(1) translateY(0)";
              pinContainer.style.borderColor = statusColor;
              pinContainer.style.boxShadow = "0 0 8px rgba(0, 0, 0, 0.5)";
            }
          }

          if (pinArrow) {
            if (isSelected) {
              pinArrow.style.borderTopColor = "#ffffff";
            } else if (isHovered) {
              pinArrow.style.borderTopColor = "rgba(255, 255, 255, 0.8)";
            } else {
              pinArrow.style.borderTopColor = statusColor;
            }
          }
        }
      }
    });
  }, [hoveredLotId, selectedLot, lots, activeTab]);

  // WhatsApp automation simulation state
  const [whatsappLogs, setWhatsappLogs] = useState([
    { time: "10:15", type: "in", sender: "+54 11 3844-2911", message: "Hola, me interesa el lote 42. ¿Tienen financiación?" },
    { time: "10:15", type: "out", sender: "Respuesta Automática", message: "¡Hola! Sí, contamos con financiación propia de hasta 48 cuotas fijas en USD. ¿Te gustaría agendar una llamada con un asesor?" },
    { time: "10:16", type: "sys", sender: "Asignador Geográfico", message: "Lead derivado automáticamente a Asesor Comercial GBA Sur." },
  ]);

  const [newMsg, setNewMsg] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    const timeString = new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
    const userLog = { time: timeString, type: "in", sender: "+54 11 8888-9999", message: newMsg };

    setWhatsappLogs((prev) => [...prev, userLog]);

    setNewMsg("");

    // Simulate instant auto-response
    setTimeout(() => {
      const botLog = {
        time: timeString,
        type: "out",
        sender: "Respuesta Automática",
        message: "¡Recibimos tu consulta! Nuestro sistema lo está derivando al especialista. En breve te contactaremos."
      };
      const sysLog = {
        time: timeString,
        type: "sys",
        sender: "Scoring Comercial",
        message: "Nuevo lead calificado con scoring alto (A). Notificación enviada al gestor de clientes."
      };
      setWhatsappLogs((prev) => [...prev, botLog, sysLog]);
    }, 1200);
  };

  const moveLead = (leadId: string, targetStatus: "new" | "contacted" | "negotiating") => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status: targetStatus } : lead))
    );
  };

  const updateLotStatus = (lotId: string, newStatus: "disponible" | "reservado" | "vendido") => {
    setLots((prev) =>
      prev.map((l) => {
        const updated = l.id === lotId ? { ...l, status: newStatus } : l;
        if (l.id === lotId) {
          setSelectedLot(updated);
        }
        return updated;
      })
    );
  };

  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar-nav">
        <div>
          <Link href="/" className="admin-logo">
            <span style={{ fontWeight: 800, letterSpacing: "-0.03em" }}>n-sistemas</span>
            <span style={{ fontSize: "0.5em", fontWeight: 400, opacity: 0.8 }}>.com</span>
          </Link>
          
        </div>

        <ul className="admin-nav-list" style={{ display: "flex", flexGrow: 1, marginTop: "24px", flexDirection: "column", gap: "10px" }}>
          <li>
            <button
              onClick={() => setActiveTab("crm-dashboard")}
              className={`admin-nav-item ${activeTab === "crm-dashboard" ? "active" : ""}`}
              style={{ width: "100%", background: "none", border: "none", textAlign: "left", paddingLeft: "24px", fontSize: "0.95rem" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              Resumen Analítico
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("crm-kanban")}
              className={`admin-nav-item ${activeTab === "crm-kanban" ? "active" : ""}`}
              style={{ width: "100%", background: "none", border: "none", textAlign: "left", paddingLeft: "44px", fontSize: "0.95rem" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <line x1="15" y1="3" x2="15" y2="21" />
              </svg>
              Organización de Leads
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("satellite")}
              className={`admin-nav-item ${activeTab === "satellite" ? "active" : ""}`}
              style={{ width: "100%", background: "none", border: "none", textAlign: "left", paddingLeft: "24px", fontSize: "0.95rem" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" y1="3" x2="9" y2="18" />
                <line x1="15" y1="6" x2="15" y2="21" />
              </svg>
              Editor Satelital
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("whatsapp")}
              className={`admin-nav-item ${activeTab === "whatsapp" ? "active" : ""}`}
              style={{ width: "100%", background: "none", border: "none", textAlign: "left", paddingLeft: "24px", fontSize: "0.95rem" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-7.6-4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Automatizaciones
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("feature-request")}
              className={`admin-nav-item ${activeTab === "feature-request" ? "active" : ""}`}
              style={{ width: "100%", background: "none", border: "none", textAlign: "left", paddingLeft: "24px", fontSize: "0.95rem" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Solicitar Función
            </button>
          </li>
        </ul>

        <div>
          <Link href="/" className="btn btn-secondary" style={{ width: "100%", fontSize: "0.8rem", padding: "8px 12px" }}>
            <span className="desktop-only">← Página principal</span>
            <span className="mobile-only">← Principal</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-header">
          <h1 className="admin-title">
            {activeTab === "crm-dashboard" && "Seguimiento de Clientes (Resumen Analítico)"}
            {activeTab === "crm-kanban" && "Embudo y Seguimiento de Ventas"}
            {activeTab === "satellite" && "Trazador de Lotes e Infraestructura Satelital"}
            {activeTab === "whatsapp" && "Motor de Automatización de Mensajería & WhatsApp"}
            {activeTab === "feature-request" && "Solicitud de Nuevas Funcionalidades"}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--text-heading)",
                transition: "var(--transition)",
                padding: 0
              }}
              title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {theme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 10px #10b981"
                }}
              ></span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Plataforma Activa</span>
            </div>
          </div>
        </header>

        <div className="admin-content">
          {/* TAB 1A: SEGUIMIENTO DE CLIENTES - RESUMEN ANALITICO */}
          {activeTab === "crm-dashboard" && (
            <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* KPI Cards Row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
                <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>Total Leads</span>
                  <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "var(--text-heading)" }}>{leads.length}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "#10b981", fontWeight: "bold" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    Activos en pipeline
                  </span>
                </div>
                <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>En Negociación</span>
                  <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "var(--secondary)" }}>{leads.filter(l => l.status === "negotiating").length}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Fase final de cierre</span>
                </div>
                <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>Tasa de Conversión</span>
                  <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#10b981" }}>32.4%</span>
                  <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: "bold" }}>+4.2% este mes</span>
                </div>
                <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>Volumen Proyectado</span>
                  <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "var(--primary)" }}>$240K <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: "normal" }}>USD</span></span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>En terrenos y oficinas</span>
                </div>
              </div>

              {/* SVG Graph Card (Full Width) */}
              <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", height: "320px" }}>
                <h4 style={{ color: "var(--text-heading)", marginBottom: "16px", fontSize: "1.25rem", fontFamily: "var(--font-sans), sans-serif", fontWeight: 700 }}>
                  Contactos Registrados en el Tiempo
                </h4>
                <div style={{ position: "relative", width: "100%", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  
                  {/* Dedicated container for the graph area to align calculations correctly with standard SVG height */}
                  <div style={{ position: "relative", width: "100%", height: `${height}px` }}>
                    
                    {/* Interactive Tooltip */}
                    {hoveredPoint && (
                      <div
                        style={{
                          position: "absolute",
                          top: `${(hoveredPoint.y / height) * 100}%`,
                          left: `${(hoveredPoint.x / width) * 100}%`,
                          transform: "translate(-50%, -120%)",
                          background: "rgba(17, 24, 39, 0.92)",
                          backdropFilter: "blur(6px)",
                          border: "1px solid var(--border-color)",
                          borderRadius: "8px",
                          padding: "8px 12px",
                          fontSize: "0.8rem",
                          color: "#ffffff",
                          pointerEvents: "none",
                          zIndex: 10,
                          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.3)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                          whiteSpace: "nowrap"
                        }}
                      >
                        <span style={{ fontSize: "0.7rem", color: "#9ca3af", fontWeight: "600" }}>{hoveredPoint.date}</span>
                        <span style={{ color: "var(--primary)", fontWeight: "bold" }}>{hoveredPoint.value} {hoveredPoint.value === 1 ? "Lead" : "Leads"}</span>
                      </div>
                    )}

                    {/* Hover Vertical Guide Line */}
                    {hoveredPoint && (
                      <div
                        style={{
                          position: "absolute",
                          left: `${(hoveredPoint.x / width) * 100}%`,
                          top: `${(paddingTop / height) * 100}%`,
                          height: `${(chartHeight / height) * 100}%`,
                          width: "0px",
                          borderLeft: "1.5px dashed var(--primary)",
                          pointerEvents: "none",
                          opacity: 0.8,
                          zIndex: 2
                        }}
                      />
                    )}

                    {/* SVG Line & Area */}
                    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ overflow: "visible", display: "block" }}>
                      <defs>
                        <linearGradient id="graph-gradient-crm" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid Lines */}
                      <line x1={paddingLeft} y1={paddingTop} x2={width - paddingRight} y2={paddingTop} stroke="var(--border-color)" strokeWidth="1" strokeDasharray="5,5" />
                      <line x1={paddingLeft} y1={paddingTop + chartHeight / 2} x2={width - paddingRight} y2={paddingTop + chartHeight / 2} stroke="var(--border-color)" strokeWidth="1" strokeDasharray="5,5" />
                      <line x1={paddingLeft} y1={height - paddingBottom} x2={width - paddingRight} y2={height - paddingBottom} stroke="var(--border-color)" strokeWidth="1" strokeDasharray="5,5" />
                      
                      {/* Area Graph Fill */}
                      <path
                        d={areaPath}
                        fill="url(#graph-gradient-crm)"
                      />

                      {/* Stroke Graph Line */}
                      <path
                        d={linePath}
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="3"
                      />
                    </svg>

                    {/* Visible HTML Circle Points to prevent stretching */}
                    {points.map((p, idx) => (
                      <div
                        key={`visible-${idx}`}
                        style={{
                          position: "absolute",
                          left: `${(p.x / width) * 100}%`,
                          top: `${(p.y / height) * 100}%`,
                          transform: "translate(-50%, -50%)",
                          width: hoveredPoint?.label === p.label ? "13px" : "9px",
                          height: hoveredPoint?.label === p.label ? "13px" : "9px",
                          borderRadius: "50%",
                          backgroundColor: hoveredPoint?.label === p.label ? "var(--primary)" : "#ffffff",
                          border: "2.5px solid var(--primary)",
                          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                          transition: "all 0.12s ease-in-out",
                          pointerEvents: "none",
                          zIndex: 5
                        }}
                      />
                    ))}

                    {/* Interactive HTML Hover Targets */}
                    {points.map((p, idx) => (
                      <div
                        key={`target-${idx}`}
                        style={{
                          position: "absolute",
                          left: `${(p.x / width) * 100}%`,
                          top: `${(p.y / height) * 100}%`,
                          transform: "translate(-50%, -50%)",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          cursor: "pointer",
                          backgroundColor: "transparent",
                          zIndex: 6
                        }}
                        onMouseEnter={() => setHoveredPoint(p)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                    ))}
                  </div>
                  
                  {/* X-Axis Day Labels */}
                  <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: `${(paddingLeft / width) * 100}%`, paddingRight: `${(paddingRight / width) * 100}%`, marginTop: "16px", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {chartData.map((d, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontWeight: hoveredPoint?.label === d.label ? "bold" : "normal",
                          color: hoveredPoint?.label === d.label ? "var(--primary)" : "var(--text-muted)",
                          transition: "color 0.15s"
                        }}
                      >
                        {d.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contacts List Card (Full Width) */}
              <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", height: "380px" }}>
                <h4 style={{ color: "var(--text-heading)", marginBottom: "16px", fontSize: "1.25rem", fontFamily: "var(--font-sans), sans-serif", fontWeight: 700 }}>
                  Registro Continuo de Contactos (Leads)
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto", flexGrow: 1, paddingRight: "4px" }}>
                  {AUTOMATION_MOCK_CONTACTS.map((contact, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "12px 16px",
                        background: "var(--bg-column)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "16px"
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--text-heading)" }}>
                          {contact.name}
                        </span>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginTop: "4px" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <polyline points="22,6 12,13 2,6" />
                            </svg>
                            {contact.email}
                          </span>
                          <span>|</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                              <line x1="12" y1="18" x2="12.01" y2="18" />
                            </svg>
                            {contact.phone}
                          </span>
                        </span>
                        <div style={{ display: "flex", gap: "6px", marginTop: "6px", flexWrap: "wrap" }}>
                          {contact.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                                padding: "2px 8px",
                                borderRadius: "4px",
                                background: tag.bg,
                                color: tag.color,
                              }}
                            >
                              {tag.text}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                        {contact.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 1B: SEGUIMIENTO DE CLIENTES - TABLERO KANBAN */}
          {activeTab === "crm-kanban" && (
            <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="glass-card" style={{ padding: "20px", marginBottom: "10px" }}>
                <h3 style={{ marginBottom: "8px" }}>Embudo y Seguimiento de Clientes</h3>
                <p style={{ fontSize: "0.95rem" }}>
                  Tus asesores pueden gestionar prospectos en tiempo real. <strong>Haz clic en cualquier tarjeta para avanzarla</strong> a la siguiente etapa de tu proceso comercial de ventas.
                </p>
              </div>

              <div className="grid-3" style={{ gap: "20px" }}>
                {/* Column 1: Nuevos Leads */}
                <div
                  className="glass-card"
                  style={{
                    background: "var(--bg-column)",
                    border: "1px solid var(--border-color)",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
                    <h4 style={{ fontSize: "1rem", color: "var(--text-heading)", fontWeight: 600 }}>Nuevos Leads</h4>
                    <span style={{ background: "rgba(59,130,246,0.2)", color: "var(--primary)", padding: "2px 8px", borderRadius: "100px", fontSize: "0.8rem" }}>
                      {leads.filter((l) => l.status === "new").length}
                    </span>
                  </div>
                  {leads
                    .filter((l) => l.status === "new")
                    .map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => moveLead(lead.id, "contacted")}
                        className="kanban-item"
                        style={{
                          padding: "16px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "var(--transition)"
                        }}
                      >
                        <h5 style={{ color: "var(--text-heading)", marginBottom: "6px" }}>{lead.name}</h5>
                        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                            <line x1="12" y1="18" x2="12.01" y2="18" />
                          </svg>
                          {lead.phone}
                        </p>
                        <p style={{ fontSize: "0.85rem", color: "var(--primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                          {lead.property}
                        </p>
                        <div style={{ marginTop: "12px", textAlign: "right" }}>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Hacer clic para contactar →</span>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Column 2: Contacto Iniciado */}
                <div
                  className="glass-card"
                  style={{
                    background: "var(--bg-column)",
                    border: "1px solid var(--border-color)",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
                    <h4 style={{ fontSize: "1rem", color: "var(--text-heading)", fontWeight: 600 }}>Contacto Iniciado</h4>
                    <span style={{ background: "rgba(245,158,11,0.2)", color: "var(--secondary)", padding: "2px 8px", borderRadius: "100px", fontSize: "0.8rem" }}>
                      {leads.filter((l) => l.status === "contacted").length}
                    </span>
                  </div>
                  {leads
                    .filter((l) => l.status === "contacted")
                    .map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => moveLead(lead.id, "negotiating")}
                        className="kanban-item"
                        style={{
                          padding: "16px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "var(--transition)"
                        }}
                      >
                        <h5 style={{ color: "var(--text-heading)", marginBottom: "6px" }}>{lead.name}</h5>
                        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                            <line x1="12" y1="18" x2="12.01" y2="18" />
                          </svg>
                          {lead.phone}
                        </p>
                        <p style={{ fontSize: "0.85rem", color: "var(--secondary)", display: "flex", alignItems: "center", gap: "6px" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                          {lead.property}
                        </p>
                        <div style={{ marginTop: "12px", textAlign: "right" }}>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Hacer clic para negociar →</span>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Column 3: En Negociación */}
                <div
                  className="glass-card"
                  style={{
                    background: "var(--bg-column)",
                    border: "1px solid var(--border-color)",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
                    <h4 style={{ fontSize: "1rem", color: "var(--text-heading)", fontWeight: 600 }}>En Negociación</h4>
                    <span style={{ background: "rgba(16,185,129,0.2)", color: "#10b981", padding: "2px 8px", borderRadius: "100px", fontSize: "0.8rem" }}>
                      {leads.filter((l) => l.status === "negotiating").length}
                    </span>
                  </div>
                  {leads
                    .filter((l) => l.status === "negotiating")
                    .map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => moveLead(lead.id, "new")}
                        className="kanban-item"
                        style={{
                          padding: "16px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "var(--transition)"
                        }}
                      >
                        <h5 style={{ color: "var(--text-heading)", marginBottom: "6px" }}>{lead.name}</h5>
                        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                            <line x1="12" y1="18" x2="12.01" y2="18" />
                          </svg>
                          {lead.phone}
                        </p>
                        <p style={{ fontSize: "0.85rem", color: "#10b981", display: "flex", alignItems: "center", gap: "6px" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                          {lead.property}
                        </p>
                        <div style={{ marginTop: "12px", textAlign: "right" }}>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Hacer clic para reiniciar →</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SATELLITE LOT EDITOR */}
          {activeTab === "satellite" && (
            <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* KPI Cards Row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
                <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>Lotes Totales</span>
                  <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "var(--text-heading)" }}>{lots.length}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Registrados en plano</span>
                </div>
                <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>Disponibles</span>
                  <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#10b981" }}>{lots.filter(l => l.status === "disponible").length}</span>
                  <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: "bold" }}>Listo para comercializar</span>
                </div>
                <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>Reservados / Vendidos</span>
                  <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#ef4444" }}>{lots.filter(l => l.status !== "disponible").length}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Con reserva o boleto firmado</span>
                </div>
                <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>Área Controlada</span>
                  <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "var(--secondary)" }}>5.6K <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: "normal" }}>m²</span></span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Superficie del sector</span>
                </div>
              </div>

              {/* Split Screen Layout */}
              <div className="satellite-grid">
                {/* Left: Leaflet Map */}
                <div
                  className="glass-card"
                  style={{
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    height: "600px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", alignItems: "center" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "500" }}>Vista Satelital Real (Google Hybrid)</span>
                    <span style={{ fontSize: "0.85rem", color: "var(--secondary)", fontWeight: "600" }}>Modo Editor: Polígonos de Tierra</span>
                  </div>

                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      flexGrow: 1,
                      background: "var(--bg-darker)",
                      borderRadius: "8px",
                      border: "1px solid var(--border-color)",
                      overflow: "hidden"
                    }}
                  >
                    <div
                      ref={mapContainerRef}
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "var(--bg-darker)"
                      }}
                    />
                  </div>
                </div>

                {/* Right: Tabbed Controls Panel */}
                <div className="glass-card" style={{ display: "flex", flexDirection: "column", height: "600px", padding: "24px" }}>
                  {/* Tabs Selector */}
                  <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)", marginBottom: "20px" }}>
                    <button
                      onClick={() => setLotEditorTab("inventory")}
                      style={{
                        flex: 1,
                        background: "none",
                        border: "none",
                        borderBottom: lotEditorTab === "inventory" ? "2px solid var(--primary)" : "2px solid transparent",
                        padding: "12px 6px",
                        color: lotEditorTab === "inventory" ? "var(--text-heading)" : "var(--text-muted)",
                        fontWeight: lotEditorTab === "inventory" ? "bold" : "normal",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        transition: "var(--transition)"
                      }}
                    >
                      Inventario Lotes ({lots.length})
                    </button>
                    <button
                      onClick={() => setLotEditorTab("details")}
                      style={{
                        flex: 1,
                        background: "none",
                        border: "none",
                        borderBottom: lotEditorTab === "details" ? "2px solid var(--primary)" : "2px solid transparent",
                        padding: "12px 6px",
                        color: lotEditorTab === "details" ? "var(--text-heading)" : "var(--text-muted)",
                        fontWeight: lotEditorTab === "details" ? "bold" : "normal",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        transition: "var(--transition)"
                      }}
                    >
                      Detalle Lote {selectedLot ? `(${selectedLot.id})` : ""}
                    </button>
                  </div>

                  {/* Tab Body */}
                  <div style={{ flexGrow: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
                    {lotEditorTab === "inventory" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {/* Quick info notes inside tab */}
                        <div style={{ background: "var(--bg-column)", border: "1px solid var(--border-color)", borderRadius: "8px", padding: "12px", fontSize: "0.85rem", color: "var(--text-main)" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", verticalAlign: "middle" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                              <line x1="9" y1="18" x2="15" y2="18" />
                              <line x1="10" y1="22" x2="14" y2="22" />
                            </svg>
                            <strong>Consejo:</strong>
                          </span>{" "}
                          Haz clic en cualquier lote directamente sobre el mapa satelital para abrir su ficha de propiedades y modificar su estado.
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {lots.map((lot) => {
                            const isHovered = hoveredLotId === lot.id;
                            const isSelected = selectedLot?.id === lot.id;
                            const statusNames = {
                              disponible: "Disponible",
                              reservado: "Reservado",
                              vendido: "Vendido"
                            };
                            const statusColors = {
                              disponible: { fill: "rgba(16, 185, 129, 0.12)", stroke: "#10b981" },
                              reservado: { fill: "rgba(245, 158, 11, 0.12)", stroke: "#f59e0b" },
                              vendido: { fill: "rgba(239, 68, 68, 0.12)", stroke: "#ef4444" }
                            };
                            const color = statusColors[lot.status];
                            return (
                              <div
                                key={lot.id}
                                style={{
                                  padding: "10px 14px",
                                  border: isSelected 
                                    ? "1.5px solid var(--primary)" 
                                    : isHovered 
                                    ? "1.5px solid var(--border-color-hover)" 
                                    : "1.5px solid var(--border-color)",
                                  background: isSelected 
                                    ? "var(--primary-glow)" 
                                    : isHovered 
                                    ? "rgba(var(--primary-rgb), 0.02)" 
                                    : "var(--bg-card)",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                  transition: "var(--transition)",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center"
                                }}
                                onMouseEnter={() => setHoveredLotId(lot.id)}
                                onMouseLeave={() => setHoveredLotId(null)}
                                onClick={() => {
                                  setSelectedLot(lot);
                                  setLotEditorTab("details");
                                }}
                              >
                                <div>
                                  <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--text-heading)", display: "block", marginBottom: "2px" }}>
                                    {lot.id} - {lot.name}
                                  </span>
                                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                                    Superficie: {lot.area}
                                  </span>
                                </div>
                                <span
                                  style={{
                                    fontSize: "0.75rem",
                                    fontWeight: "bold",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    background: color.fill,
                                    color: color.stroke,
                                    border: `1px solid ${color.stroke}30`
                                  }}
                                >
                                  {statusNames[lot.status]}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {lotEditorTab === "details" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1 }}>
                        {selectedLot ? (
                          <>
                            <div style={{ background: "var(--bg-column)", border: "1px solid var(--border-color)", borderRadius: "8px", padding: "16px", flexGrow: 1 }}>
                              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <tbody>
                                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                                    <td style={{ padding: "14px 0", fontSize: "0.9rem", color: "var(--text-muted)" }}>Identificador:</td>
                                    <td style={{ padding: "14px 0", textAlign: "right", fontSize: "1rem", color: "var(--text-heading)", fontWeight: "600" }}>{selectedLot.id}</td>
                                  </tr>
                                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                                    <td style={{ padding: "14px 0", fontSize: "0.9rem", color: "var(--text-muted)" }}>Nombre:</td>
                                    <td style={{ padding: "14px 0", textAlign: "right", fontSize: "1.05rem", color: "var(--text-heading)" }}>{selectedLot.name}</td>
                                  </tr>
                                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                                    <td style={{ padding: "14px 0", fontSize: "0.9rem", color: "var(--text-muted)" }}>Superficie:</td>
                                    <td style={{ padding: "14px 0", textAlign: "right", fontSize: "1.05rem", color: "var(--text-heading)" }}>{selectedLot.area}</td>
                                  </tr>
                                  <tr>
                                    <td style={{ padding: "14px 0", fontSize: "0.9rem", color: "var(--text-muted)" }}>Estado Actual:</td>
                                    <td style={{ padding: "14px 0", textAlign: "right" }}>
                                      <span
                                        style={{
                                          display: "inline-block",
                                          padding: "4px 10px",
                                          borderRadius: "4px",
                                          fontSize: "0.85rem",
                                          fontWeight: "600",
                                          background:
                                            selectedLot.status === "disponible"
                                              ? "rgba(16,185,129,0.12)"
                                              : selectedLot.status === "reservado"
                                              ? "rgba(245,158,11,0.12)"
                                              : "rgba(239,68,68,0.12)",
                                          color:
                                            selectedLot.status === "disponible"
                                              ? "#10b981"
                                              : selectedLot.status === "reservado"
                                              ? "#f59e0b"
                                              : "#ef4444",
                                          border: `1px solid ${
                                            selectedLot.status === "disponible"
                                              ? "#10b98130"
                                              : selectedLot.status === "reservado"
                                              ? "#f59e0b30"
                                              : "#ef444430"
                                          }`
                                        }}
                                      >
                                        {selectedLot.status.toUpperCase()}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto" }}>
                              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "500" }}>Modificar Estado del Lote:</span>
                              <div style={{ display: "flex", gap: "8px" }}>
                                <button
                                  onClick={() => updateLotStatus(selectedLot.id, "disponible")}
                                  className="btn btn-secondary"
                                  style={{ flex: 1, padding: "10px", fontSize: "0.85rem" }}
                                >
                                  Disponible
                                </button>
                                <button
                                  onClick={() => updateLotStatus(selectedLot.id, "reservado")}
                                  className="btn btn-secondary"
                                  style={{ flex: 1, padding: "10px", fontSize: "0.85rem", borderColor: "rgba(245,158,11,0.4)", color: "#d97706" }}
                                >
                                  Reservar
                                </button>
                                <button
                                  onClick={() => updateLotStatus(selectedLot.id, "vendido")}
                                  className="btn btn-secondary"
                                  style={{ flex: 1, padding: "10px", fontSize: "0.85rem", borderColor: "rgba(239,68,68,0.4)", color: "#ef4444" }}
                                >
                                  Vendido
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexGrow: 1, textAlign: "center", padding: "20px", color: "var(--text-muted)" }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "12px", opacity: 0.5 }}>
                              <polygon points="12 2 2 7 12 12 22 7 12 2" />
                              <polyline points="2 17 12 22 22 17" />
                              <polyline points="2 12 12 17 22 12" />
                            </svg>
                            <p style={{ fontSize: "0.9rem" }}>Ningún lote seleccionado en el mapa.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WHATSAPP AUTOMATION */}
          {activeTab === "whatsapp" && (
            <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* KPI Cards Row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
                <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>Mensajes Recibidos</span>
                  <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "var(--text-heading)" }}>1,248</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "#10b981", fontWeight: "bold" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    99.8% entregados
                  </span>
                </div>
                <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>Consultas Hoy</span>
                  <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "var(--secondary)" }}>15</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--secondary)", fontWeight: "bold" }}>Atendidas de forma automática</span>
                </div>
                <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>Tiempo de Respuesta</span>
                  <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#10b981" }}>1.2s</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Promedio automatizado</span>
                </div>
                <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>Scoring Alto (A/B)</span>
                  <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "var(--primary)" }}>87%</span>
                  <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: "bold" }}>Derivados a asesores</span>
                </div>
              </div>

              <div className="contact-grid" style={{ alignItems: "stretch" }}>
                {/* Left Column: Rules Info */}
                <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "450px" }}>
                  <div>
                    <h3 style={{ marginBottom: "12px", fontSize: "1.45rem", fontFamily: "var(--font-title)", fontWeight: 400, color: "var(--text-heading)" }}>Respuestas Automatizadas</h3>
                    <p style={{ fontSize: "0.95rem", marginBottom: "20px" }}>
                      El motor intercepta consultas de portales inmobiliarios (ZonaProp, Argenprop, MercadoLibre) y WhatsApp, procesando respuestas automáticas al instante para evitar que el lead se enfríe.
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderTop: "1px solid var(--border-color)", paddingTop: "16px" }}>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-heading)" }}><strong>Reglas Activas en tu base tecnológica:</strong></p>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.8rem", color: "var(--text-main)" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Respuestas WhatsApp automáticas 24/7.
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.8rem", color: "var(--text-main)" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Derivación de leads basado en código postal y presupuesto.
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.8rem", color: "var(--text-main)" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Scoring comercial automático utilizando OpenAI API.
                      </div>
                    </div>
                  </div>

                  <div style={{ background: "var(--bg-column)", border: "1px solid var(--border-color)", borderRadius: "8px", padding: "16px", marginTop: "16px" }}>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-main)", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M12 2v4" />
                        <path d="M8 5h8" />
                        <line x1="8" y1="15" x2="8.01" y2="15" />
                        <line x1="16" y1="15" x2="16.01" y2="16.01" />
                      </svg>
                      El sistema procesa consultas en tiempo real y califica de forma automática el perfil del cliente para registrarlo en el Seguimiento.
                    </p>
                  </div>
                </div>

                {/* Right Column: Chat simulator */}
                <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", height: "450px" }}>
                  <h4 style={{ color: "var(--text-heading)", marginBottom: "16px", fontSize: "1.25rem", fontFamily: "var(--font-title)", fontWeight: 400 }}>Consola de Respuestas Automáticas</h4>

                  {/* Logs Screen */}
                  <div
                    style={{
                      flexGrow: 1,
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      padding: "16px",
                      background: "var(--bg-column)",
                      borderRadius: "8px",
                      border: "1px solid var(--border-color)",
                      marginBottom: "16px"
                    }}
                  >
                    {whatsappLogs.map((log, idx) => (
                      <div
                        key={idx}
                        style={{
                          alignSelf: log.type === "in" ? "flex-end" : log.type === "out" ? "flex-start" : "center",
                          maxWidth: log.type === "sys" ? "100%" : "85%",
                          background:
                            log.type === "in"
                              ? "rgba(59, 130, 246, 0.12)"
                              : log.type === "out"
                              ? "rgba(37, 211, 102, 0.08)"
                              : "var(--bg-column)",
                          border:
                            log.type === "in"
                              ? "1px solid rgba(59, 130, 246, 0.25)"
                              : log.type === "out"
                              ? "1px solid rgba(37, 211, 102, 0.2)"
                              : "1px solid var(--border-color)",
                          borderRadius: "8px",
                          padding: "8px 12px",
                          fontSize: "0.8rem",
                          color: log.type === "sys" ? "var(--text-muted)" : "var(--text-heading)"
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "700",
                            color: log.type === "in" ? "var(--primary)" : log.type === "out" ? (theme === "light" ? "#16a34a" : "#25d366") : (theme === "light" ? "#d97706" : "#f59e0b"),
                            fontSize: "0.7rem",
                            marginBottom: "4px"
                          }}
                        >
                          {log.sender} • {log.time}
                        </div>
                        <div>{log.message}</div>
                      </div>
                    ))}
                  </div>

                  {/* Form Input */}
                  <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      value={newMsg}
                      onChange={(e) => setNewMsg(e.target.value)}
                      placeholder="Simula un mensaje de un lead de WhatsApp..."
                      className="form-control"
                      style={{ flexGrow: 1, padding: "10px", fontSize: "0.85rem" }}
                    />
                    <button type="submit" className="btn btn-primary" style={{ padding: "10px 20px", fontSize: "0.85rem" }}>
                      Enviar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SOLICITAR NUEVA FUNCIONALIDAD */}
          {activeTab === "feature-request" && (
            <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "800px", margin: "0 auto", width: "100%" }}>
              <div className="glass-card" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <h3 style={{ fontSize: "1.6rem", fontFamily: "var(--font-title)", fontWeight: 400, color: "var(--text-heading)" }}>Solicitar Nueva Funcionalidad</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-main)", lineHeight: "1.6" }}>
                  ¿Necesitas un módulo específico para tu inmobiliaria? Describe la funcionalidad que te gustaría ver en nuestra plataforma. Nuestro equipo de ingenieros analizará la propuesta para incorporarla en futuros sprints.
                </p>
                <hr style={{ border: "none", borderTop: "1px solid var(--border-color)", margin: "10px 0" }} />

                {featureSubmitted ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", textAlign: "center", gap: "16px" }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <h4 style={{ color: "var(--text-heading)", fontSize: "1.25rem", fontWeight: 600 }}>¡Propuesta Recibida Exitosamente!</h4>
                    <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", maxWidth: "500px" }}>
                      Tu solicitud de funcionalidad ha sido registrada en nuestro pipeline de desarrollo. Estaremos revisándola y priorizándola en nuestra próxima planeación de sprint. ¡Gracias por ayudarnos a mejorar!
                    </p>
                    <button
                      onClick={() => {
                        setFeatureSubmitted(false);
                        setFeatureTitle("");
                        setFeatureDesc("");
                      }}
                      className="btn btn-secondary"
                      style={{ marginTop: "12px", padding: "10px 20px", fontSize: "0.95rem" }}
                    >
                      Solicitar Otra Función
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFeatureSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-heading)" }}>Nombre Completo</label>
                        <input
                          type="text"
                          required
                          value={visitorName}
                          onChange={(e) => setVisitorName(e.target.value)}
                          placeholder="Juan Pérez"
                          className="form-control"
                          style={{ padding: "12px", fontSize: "0.95rem" }}
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-heading)" }}>Correo Electrónico</label>
                        <input
                          type="email"
                          required
                          value={visitorEmail}
                          onChange={(e) => setVisitorEmail(e.target.value)}
                          placeholder="juan@inmobiliaria.com"
                          className="form-control"
                          style={{ padding: "12px", fontSize: "0.95rem" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-heading)" }}>Título de la Funcionalidad</label>
                      <input
                        type="text"
                        required
                        value={featureTitle}
                        onChange={(e) => setFeatureTitle(e.target.value)}
                        placeholder="Ej. Integración con firma digital de contratos"
                        className="form-control"
                        style={{ padding: "12px", fontSize: "0.9rem" }}
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-heading)" }}>Descripción Detallada</label>
                      <textarea
                        required
                        rows={5}
                        value={featureDesc}
                        onChange={(e) => setFeatureDesc(e.target.value)}
                        placeholder="Describe cómo debería funcionar, qué problema resuelve y por qué sería útil para tu operación diaria..."
                        className="form-control"
                        style={{ padding: "12px", fontSize: "0.9rem", resize: "vertical", fontFamily: "inherit" }}
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-heading)" }}>Prioridad Estimada</label>
                      <select
                        value={featurePriority}
                        onChange={(e) => setFeaturePriority(e.target.value)}
                        className="form-control"
                        style={{ padding: "12px", fontSize: "0.95rem", background: "var(--bg-card)", color: "var(--text-heading)" }}
                      >
                        <option value="baja">Baja (Opcional pero útil)</option>
                        <option value="media">Media (Mejoraría mucho el flujo de trabajo)</option>
                        <option value="alta">Alta (Crítica para operar en el día a día)</option>
                      </select>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ padding: "14px", fontSize: "0.95rem", fontWeight: "bold", marginTop: "10px" }}>
                      Enviar Propuesta de Funcionalidad
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
