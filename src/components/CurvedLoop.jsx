import React, { useRef, useEffect, useState, useMemo, useId } from 'react';
import './CurvedLoop.css';

const CurvedLoop = ({
  marqueeText = '',
  speed = 2,
  className = '',
  curveAmount = 400,
  direction = 'left',
  interactive = true,
  items = [],
  onItemClick,
  pauseOnHover = true,
  viewBox = '0 0 1440 120',
  pathD: customPathD,
  jacketClassName = '',
  style,
  ...rest
}) => {
  const hasItems = Array.isArray(items) && items.length > 0;

  // Measure text string for a single repetition cycle
  const text = useMemo(() => {
    if (hasItems) {
      return items.map(item => `${item.label}  ✦  `).join('');
    }
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [hasItems, items, marqueeText]);

  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const pathRef = useRef(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid.replace(/:/g, '')}`;
  
  // Default path or custom SVG quadratic curve
  const pathD = customPathD || `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const dragRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const isHoveredRef = useRef(false);

  const textLength = spacing;
  const ready = spacing > 0;

  // Calculate repeat count to ensure continuous loop across wide viewports
  const totalCycles = textLength ? Math.max(3, Math.ceil(3600 / textLength) + 2) : 1;

  const totalText = textLength
    ? Array(Math.ceil(1800 / textLength) + 2)
        .fill(text)
        .join('')
    : text;

  // Measure text length accurately
  useEffect(() => {
    if (measureRef.current) {
      setSpacing(measureRef.current.getComputedTextLength());
    }
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute('startOffset', initial + 'px');
      setOffset(initial);
    }
  }, [spacing]);

  // Infinite Animation Loop
  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        if (!isHoveredRef.current || !pauseOnHover) {
          const delta = dirRef.current === 'right' ? speed : -speed;
          const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
          let newOffset = currentOffset + delta;

          const wrapPoint = spacing;
          if (newOffset <= -wrapPoint) newOffset += wrapPoint;
          if (newOffset > 0) newOffset -= wrapPoint;

          textPathRef.current.setAttribute('startOffset', newOffset + 'px');
          setOffset(newOffset);
        }
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready, pauseOnHover]);

  const onPointerDown = e => {
    if (!interactive) return;
    dragRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    if (e.target.setPointerCapture && e.pointerId !== undefined) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  const onPointerMove = e => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    if (Math.abs(e.clientX - startXRef.current) > 6) {
      hasDraggedRef.current = true;
    }
    lastXRef.current = e.clientX;
    velRef.current = dx;

    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;

    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;

    textPathRef.current.setAttribute('startOffset', newOffset + 'px');
    setOffset(newOffset);
  };

  const activeItemRef = useRef(null);
  const lastTriggeredClickRef = useRef(0);

  const triggerItemClick = (item, e) => {
    if (!item) return;
    const now = Date.now();
    if (now - lastTriggeredClickRef.current < 250) return;
    lastTriggeredClickRef.current = now;

    if (onItemClick) {
      onItemClick(item.href, item, e);
    } else if (item.href) {
      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const endDrag = (e) => {
    if (!interactive) return;
    const wasDragging = hasDraggedRef.current;
    dragRef.current = false;
    
    // If pointer released without dragging, trigger navigation for the pressed item
    if (!wasDragging && activeItemRef.current) {
      triggerItemClick(activeItemRef.current, e);
    }
    activeItemRef.current = null;

    if (Math.abs(velRef.current) > 0.5) {
      dirRef.current = velRef.current > 0 ? 'right' : 'left';
    }
  };

  const handleItemClick = (e, item) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    triggerItemClick(item, e);
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  return (
    <div
      className={`curved-loop-jacket ${jacketClassName}`.trim()}
      style={{
        visibility: ready ? 'visible' : 'hidden',
        cursor: cursorStyle,
        ...style
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={() => {
        isHoveredRef.current = false;
        endDrag();
      }}
      onMouseEnter={() => {
        if (pauseOnHover) isHoveredRef.current = true;
      }}
      {...rest}
    >
      <svg className="curved-loop-svg" viewBox={viewBox}>
        {/* Hidden measurement text */}
        <text
          ref={measureRef}
          xmlSpace="preserve"
          className={className}
          style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}
        >
          {text}
        </text>

        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>

        {ready && (
          <text fontWeight="bold" xmlSpace="preserve" className={className}>
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offset + 'px'} xmlSpace="preserve">
              {hasItems
                ? Array.from({ length: totalCycles }).map((_, cycleIdx) => (
                    <React.Fragment key={cycleIdx}>
                      {items.map((item, itemIdx) => (
                        <tspan
                          key={`${cycleIdx}-${itemIdx}`}
                          onPointerDown={() => {
                            activeItemRef.current = item;
                          }}
                          onClick={e => handleItemClick(e, item)}
                          className="curved-loop-nav-item"
                          style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                        >
                          <tspan className="curved-loop-label">{item.label}</tspan>
                          <tspan className="curved-loop-separator" style={{ pointerEvents: 'none' }}>
                            {'  ✦  '}
                          </tspan>
                        </tspan>
                      ))}
                    </React.Fragment>
                  ))
                : totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
