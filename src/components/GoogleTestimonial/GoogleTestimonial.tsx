"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import ReviewsData from "./google_reviews.json";

export type Review = {
  user: { name: string; profileImg: string };
  rating: number;
  date: string;
  text: string;
  reviewId: string;
};

export type TestimonialsProps = {
  autoplay?: boolean;
  autoplayDelayMs?: number;
};

export default function TestimonialGoogleSwiper({
  autoplay = true,
  autoplayDelayMs = 4000,
}: TestimonialsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [placeInfo, setPlaceInfo] = useState({
    name: "Brands2be",
    googleMapsUrl: "https://maps.app.goo.gl/ncoNCyUvUN1B4hjr9",
  });

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const autoplayRef = useRef<number | null>(null);

  // Load unique reviews
  useEffect(() => {
    if (!ReviewsData.reviews) return;

    const uniqueReviews = ReviewsData.reviews.filter(
      (v, i, a) =>
        a.findIndex((r) => r.reviewId === v.reviewId) === i && v.reviewId
    );

    setReviews(uniqueReviews);

    setPlaceInfo({
      ...placeInfo,
      googleMapsUrl: `https://www.google.com/maps/place/${encodeURIComponent(
        placeInfo.name
      )}`,
    });
  }, []);

  // Autoplay
  useEffect(() => {
    if (!autoplay || reviews.length === 0) return;
    startAutoplay();
    return () => stopAutoplay();
  }, [autoplay, autoplayDelayMs, reviews.length]);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = window.setInterval(() => goNext(), autoplayDelayMs);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    const cardLeft = card.offsetLeft;
    const containerWidth = track.clientWidth;
    const cardWidth = card.offsetWidth;
    track.scrollTo({
      left: cardLeft - (containerWidth - cardWidth) / 2,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const goPrev = () =>
    scrollToIndex(activeIndex - 1 < 0 ? reviews.length - 1 : activeIndex - 1);
  const goNext = () => scrollToIndex((activeIndex + 1) % reviews.length);

  // Track scroll to update activeIndex
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const children = Array.from(track.children) as HTMLElement[];
      const trackRect = track.getBoundingClientRect();
      const center = trackRect.left + trackRect.width / 2;
      let bestIndex = 0;
      let bestDist = Infinity;

      children.forEach((c, i) => {
        const rect = c.getBoundingClientRect();
        const cCenter = rect.left + rect.width / 2;
        const dist = Math.abs(center - cCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      setActiveIndex(bestIndex);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
      <div className="flex items-center gap-1 text-yellow-600">
        {Array.from({ length: fullStars }).map((_, idx) => (
          <FaStar key={`full-${idx}`} />
        ))}
        {hasHalf && <FaStarHalfAlt />}
        {Array.from({ length: emptyStars }).map((_, idx) => (
          <FaRegStar key={`empty-${idx}`} />
        ))}
      </div>
    );
  };

  return (
    <section className="w-full bg-gradient-to-br from-blue-100 via-gray-100 to-white  mx-auto py-8 md:py-12 relative overflow-hidden">
      <div className="container mx-auto px-6">
      <div className="flex items-center justify-between mb-6 ">
        <h2 className="text-2xl md:text-4xl font-extrabold text-blue-600 mb-4">
          What People Say
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => {
              stopAutoplay();
              goPrev();
            }}
            className="p-3 rounded-full bg-white border border-[#B2EBF2] shadow hover:bg-[#007C91] hover:text-white transition-all"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={() => {
              stopAutoplay();
              goNext();
            }}
            className="p-3 rounded-full bg-white border border-[#B2EBF2] shadow hover:bg-[#007C91] hover:text-white transition-all"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={trackRef}
        onMouseEnter={stopAutoplay}
        onMouseLeave={() => autoplay && startAutoplay()}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-6"
      >
        {reviews.map((r, idx) => (
          <article
            key={r.reviewId}
            className={`snap-center flex-shrink-0 bg-[#FAFAFA] p-6 rounded-2xl shadow-md flex flex-col justify-between border border-[#B2EBF2] hover:shadow-lg transition-transform hover:scale-[1.03] ${idx === activeIndex ? "ring-2 ring-[#007C91]/50" : ""
              } w-[88%] sm:w-[65%] md:w-[48%] lg:w-[30%]`}
          >
            {/* User Info */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={r.user.profileImg}
                alt={r.user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#007C91]/20"
              />
              <div>
                <p className="font-semibold text-[#263238]">{r.user.name}</p>
                <p className="text-xs text-gray-400">{r.date}</p>
              </div>
            </div>

            {/* Review Text */}
            <p
              className={`text-[#263238] mb-4 leading-relaxed ${expandedIndex === reviews.indexOf(r) ? "" : "line-clamp-5"
                } cursor-pointer`}
              onClick={() =>
                setExpandedIndex(
                  expandedIndex === reviews.indexOf(r)
                    ? null
                    : reviews.indexOf(r)
                )
              }
            >
              {r.text.replace(/^\"|\"$/g, "")}
            </p>

            {/* Stars + View on Maps */}
            <div className="mt-auto flex items-center justify-between gap-2">
              {renderStars(r.rating)}
              <Link
                href={placeInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-3 font-[600] py-2 text-white rounded-md bg-blue-600 shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                View More
              </Link>

            </div>
          </article>
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              stopAutoplay();
              scrollToIndex(i);
            }}
            className={`w-3 h-3 rounded-full transition-all ${i === activeIndex
                ? "bg-blue-600"
                : "bg-blue-100 hover:bg-blue-600/50"
              }`}
          />
        ))}
      </div>
      </div>
    </section>
  );
}
