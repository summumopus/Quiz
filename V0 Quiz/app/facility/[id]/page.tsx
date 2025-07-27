import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Star,
  Clock,
  Heart,
  Phone,
  Mail,
  Globe,
  Calendar,
  Users,
  Award,
  CheckCircle,
  AlertTriangle,
  Plane,
  Hotel,
  Car,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function FacilityPage() {
  const facility = {
    id: 1,
    name: "Bangkok Heart Hospital",
    location: "Bangkok, Thailand",
    address: "2 Soi Soonvijai 7, New Petchburi Rd, Huai Khwang, Bangkok 10310, Thailand",
    specialty: "Cardiology",
    rating: 4.8,
    reviews: 1247,
    accreditation: ["JCI", "ISO 9001", "HA"],
    priceRange: "$8,000 - $15,000",
    established: "1996",
    beds: "554",
    languages: ["English", "Thai", "Japanese", "Chinese", "Arabic"],
    waitTime: "2-3 weeks",
    description:
      "Bangkok Heart Hospital is a specialized cardiac care facility in Thailand, focusing on comprehensive heart treatments and international patient services. The hospital combines modern medical technology with experienced medical professionals.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    contact: {
      phone: "+66 2 310 3000",
      email: "info@bangkokheart.co.th",
      website: "www.bangkokheart.com",
      emergencyPhone: "+66 2 310 3333",
    },
    departments: [
      "Cardiology & Cardiac Surgery",
      "Interventional Cardiology",
      "Cardiac Rehabilitation",
      "Emergency Cardiac Care",
      "Pediatric Cardiology",
      "Cardiac Imaging",
    ],
    treatments: [
      {
        name: "Coronary Artery Bypass (CABG)",
        priceRange: "$12,000 - $18,000",
        duration: "4-6 hours",
        recovery: "7-10 days hospital stay",
        description: "Surgical procedure to improve blood flow to the heart",
      },
      {
        name: "Heart Valve Replacement",
        priceRange: "$15,000 - $22,000",
        duration: "3-5 hours",
        recovery: "5-8 days hospital stay",
        description: "Replacement of damaged heart valves with mechanical or biological valves",
      },
      {
        name: "Angioplasty & Stenting",
        priceRange: "$8,000 - $12,000",
        duration: "1-2 hours",
        recovery: "1-2 days hospital stay",
        description: "Minimally invasive procedure to open blocked arteries",
      },
    ],
    doctors: [
      {
        name: "Dr. Somchai Jongjirasiri",
        specialty: "Cardiac Surgeon",
        experience: "25 years",
        education: "Harvard Medical School, USA",
        languages: ["English", "Thai"],
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        name: "Dr. Siriporn Tangsombatvisit",
        specialty: "Interventional Cardiologist",
        experience: "18 years",
        education: "Mayo Clinic, USA",
        languages: ["English", "Thai", "Japanese"],
        image: "/placeholder.svg?height=150&width=150",
      },
    ],
  }

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
              <Link href="/results" className="text-gray-600 hover:text-gray-900">
                Back to Results
              </Link>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                New Search
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <Image
                src={facility.images[0] || "/placeholder.svg"}
                alt={facility.name}
                width={800}
                height={400}
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {facility.images.slice(1, 5).map((image, index) => (
                <Image
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${facility.name} ${index + 2}`}
                  width={200}
                  height={150}
                  className="w-full h-36 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{facility.name}</h1>

              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{facility.location}</span>
              </div>

              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="font-semibold text-lg">{facility.rating}</span>
                  <span className="text-gray-500 ml-1">({facility.reviews} reviews)</span>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {facility.specialty}
                </Badge>
                <div className="flex gap-1">
                  {facility.accreditation.map((accred) => (
                    <Badge key={accred} variant="outline" className="text-xs">
                      {accred}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-gray-600 mb-4">{facility.description}</p>
            </div>

            <Card className="w-full lg:w-80">
              <CardHeader>
                <CardTitle className="text-center">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{facility.priceRange}</div>
                  <div className="text-sm text-gray-500">Estimated treatment cost</div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-sm text-gray-600">{facility.contact.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-gray-600">{facility.contact.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Website</div>
                      <div className="text-sm text-gray-600">{facility.contact.website}</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button className="w-full" size="lg">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Facility
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email Inquiry
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="treatments">Treatments</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="travel">Travel Info</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Accreditations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {facility.accreditation.map((accred) => (
                      <div key={accred} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">{accred}</div>
                          <div className="text-sm text-gray-500">
                            {accred === "JCI" && "Joint Commission International"}
                            {accred === "ISO 9001" && "Quality Management System"}
                            {accred === "HA" && "Hospital Accreditation Thailand"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Departments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {facility.departments.map((dept) => (
                      <div key={dept} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{dept}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Facility Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="font-medium">Established</div>
                    <div className="text-gray-600">{facility.established}</div>
                  </div>
                  <div>
                    <div className="font-medium">Hospital Beds</div>
                    <div className="text-gray-600">{facility.beds}</div>
                  </div>
                  <div>
                    <div className="font-medium">Wait Time</div>
                    <div className="text-gray-600">{facility.waitTime}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="treatments" className="space-y-6">
            <div className="grid gap-6">
              {facility.treatments.map((treatment, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{treatment.name}</CardTitle>
                        <CardDescription>{treatment.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{treatment.priceRange}</div>
                        <div className="text-sm text-gray-500">Estimated cost</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Duration: {treatment.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Recovery: {treatment.recovery}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="doctors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {facility.doctors.map((doctor, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src={doctor.image || "/placeholder.svg"}
                        alt={doctor.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{doctor.name}</h3>
                        <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                        <p className="text-sm text-gray-600 mb-2">{doctor.experience} experience</p>
                        <p className="text-sm text-gray-600 mb-3">Education: {doctor.education}</p>
                        <div className="flex flex-wrap gap-1">
                          {doctor.languages.map((lang) => (
                            <Badge key={lang} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Main Phone</div>
                      <div className="text-gray-600">{facility.contact.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-red-600" />
                    <div>
                      <div className="font-medium">Emergency</div>
                      <div className="text-gray-600">{facility.contact.emergencyPhone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-gray-600">{facility.contact.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Website</div>
                      <div className="text-gray-600">{facility.contact.website}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <div className="font-medium mb-2">{facility.name}</div>
                      <div className="text-gray-600">{facility.address}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="travel" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="h-5 w-5" />
                    Airport Access
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">Suvarnabhumi Airport (BKK) - 45 minutes</p>
                  <ul className="text-sm space-y-1">
                    <li>• Taxi: ~$15-20 USD</li>
                    <li>• Airport Rail Link available</li>
                    <li>• Hospital shuttle on request</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hotel className="h-5 w-5" />
                    Nearby Hotels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">Multiple accommodation options</p>
                  <ul className="text-sm space-y-1">
                    <li>• Hotels within walking distance</li>
                    <li>• Patient-friendly accommodations</li>
                    <li>• Family rooms available</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Local Transport
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">Easy city access</p>
                  <ul className="text-sm space-y-1">
                    <li>• BTS Skytrain nearby</li>
                    <li>• Taxi and ride-sharing</li>
                    <li>• Public transportation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Important Disclaimer */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              Important Information Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-700">
              This information is provided for reference purposes only. Trusted Care Abroad curates data about medical
              facilities but does not provide medical advice or guarantee treatment outcomes. Prices are estimates and
              may vary based on individual cases. Please verify all information directly with the medical facility
              before making any decisions. Always consult with qualified healthcare professionals for medical advice and
              treatment recommendations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
