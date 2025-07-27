"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Star, Clock, Heart, Phone, Mail, Globe, Filter } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Image from "next/image"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  // Get quiz answers from URL params
  const quizData = {
    treatment: searchParams.get("treatment") || "",
    urgency: searchParams.get("urgency") || "",
    budget: Number.parseInt(searchParams.get("budget") || "10000"),
    location: searchParams.get("location")?.split(",") || [],
    priorities: searchParams.get("priorities")?.split(",") || [],
    age: searchParams.get("age") || "",
    insurance: searchParams.get("insurance") || "",
    travelReady: searchParams.get("travelReady") || "",
  }

  // Mock data - in real app, this would come from Supabase
  const facilities = [
    {
      id: 1,
      name: "Bangkok Heart Hospital",
      location: "Bangkok, Thailand",
      country: "Thailand",
      region: "asia",
      specialty: "Cardiology",
      rating: 4.8,
      reviewCount: 1247,
      accreditation: ["JCI", "ISO"],
      priceRange: "$8,000 - $15,000",
      estimatedCost: 11500,
      image: "/placeholder.svg?height=200&width=300",
      languages: ["English", "Thai", "Japanese"],
      waitTime: "2-3 weeks",
      description: "Specialized cardiac care facility with international patient services and modern equipment.",
      contact: {
        phone: "+66 2 310 3000",
        email: "info@bangkokheart.co.th",
        website: "www.bangkokheart.com",
      },
    },
    {
      id: 2,
      name: "Apollo Hospitals Chennai",
      location: "Chennai, India",
      country: "India",
      region: "asia",
      specialty: "Multi-specialty",
      rating: 4.7,
      reviewCount: 892,
      accreditation: ["JCI", "NABH"],
      priceRange: "$6,000 - $12,000",
      estimatedCost: 9000,
      image: "/placeholder.svg?height=200&width=300",
      languages: ["English", "Hindi", "Tamil"],
      waitTime: "1-2 weeks",
      description: "Large multi-specialty hospital with comprehensive cardiac care and rehabilitation services.",
      contact: {
        phone: "+91 44 2829 3333",
        email: "info@apollohospitals.com",
        website: "www.apollohospitals.com",
      },
    },
    {
      id: 3,
      name: "Acibadem Maslak Hospital",
      location: "Istanbul, Turkey",
      country: "Turkey",
      region: "europe",
      specialty: "Cardiology",
      rating: 4.6,
      reviewCount: 654,
      accreditation: ["JCI", "TÜV"],
      priceRange: "$7,000 - $14,000",
      estimatedCost: 10500,
      image: "/placeholder.svg?height=200&width=300",
      languages: ["English", "Turkish", "Arabic"],
      waitTime: "2-4 weeks",
      description: "Modern hospital with advanced cardiac surgery capabilities and European standards.",
      contact: {
        phone: "+90 212 304 4444",
        email: "international@acibadem.com.tr",
        website: "www.acibadem.com.tr",
      },
    },
  ]

  // Filter facilities based on quiz answers
  const filteredFacilities = facilities.filter((facility) => {
    // Filter by budget
    if (facility.estimatedCost > quizData.budget * 1.2) return false

    // Filter by location preference
    if (quizData.location.length > 0 && !quizData.location.includes(facility.region)) return false

    return true
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Trusted Care Abroad</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/quiz" className="text-gray-600 hover:text-gray-900">
                Retake Quiz
              </Link>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                New Search
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Results Summary */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Treatment Information for: {quizData.treatment}</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold text-blue-900 mb-2">Based on your preferences:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Budget:</span> ${quizData.budget.toLocaleString()}
              </div>
              <div>
                <span className="text-blue-700">Urgency:</span> {quizData.urgency}
              </div>
              <div>
                <span className="text-blue-700">Regions:</span> {quizData.location.join(", ") || "Any"}
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Input placeholder="Refine your search..." className="w-full" />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-600">Found {filteredFacilities.length} facilities matching your criteria</p>
            <Select defaultValue="match">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Best match</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {filteredFacilities.map((facility) => (
            <Card key={facility.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-80 relative">
                  <Image
                    src={facility.image || "/placeholder.svg"}
                    alt={facility.name}
                    width={320}
                    height={240}
                    className="w-full h-60 md:h-full object-cover"
                  />
                  {facility.estimatedCost <= quizData.budget && (
                    <Badge className="absolute top-3 left-3 bg-green-600">Within Budget</Badge>
                  )}
                </div>

                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{facility.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{facility.location}</span>
                      </div>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="font-medium">{facility.rating}</span>
                          <span className="text-gray-500 text-sm ml-1">({facility.reviewCount} reviews)</span>
                        </div>
                        <Badge variant="secondary">{facility.specialty}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{facility.priceRange}</div>
                      <div className="text-sm text-gray-500">Estimated cost</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{facility.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-blue-600 mr-2" />
                      <div>
                        <div className="font-medium">Wait Time</div>
                        <div className="text-gray-500">{facility.waitTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <Globe className="h-4 w-4 text-green-600 mr-2" />
                      <div>
                        <div className="font-medium">Languages</div>
                        <div className="text-gray-500">{facility.languages.slice(0, 2).join(", ")}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 text-yellow-500 mr-2" />
                      <div>
                        <div className="font-medium">Accreditation</div>
                        <div className="text-gray-500">{facility.accreditation.join(", ")}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link href={`/facility/${facility.id}`} className="flex-1">
                      <Button className="w-full">View Details</Button>
                    </Link>
                    <Button variant="outline" size="icon" title="Call">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" title="Email">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredFacilities.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No facilities found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your criteria or budget range to see more options.</p>
              <Link href="/quiz">
                <Button>Retake Quiz</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Important Notice */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800">Important Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-700">
              The information provided is for reference only. Prices are estimates and may vary. Please contact
              facilities directly to verify current pricing, availability, and treatment details. Always consult with
              qualified healthcare professionals before making medical decisions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
