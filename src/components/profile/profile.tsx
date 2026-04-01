"use client";

import { useGetMe } from "@/api/auth/auth.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

const Profile = () => {
  const { data: user, isLoading } = useGetMe();

  const userData = user?.data;

  const isAdmin = !!userData?.admin;
  const isOrganizer = !!userData?.organizers;

  const formatDate = (date?: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Loading profile...</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header Card */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <Avatar className="h-20 w-20 border">
            <AvatarImage src={userData?.image || ""} alt={userData?.name} />
            <AvatarFallback className="text-lg font-semibold">
              {userData?.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {userData?.name || "Unknown User"}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <Badge variant="secondary" className="capitalize">
                {userData?.user_role || "user"}
              </Badge>

              <Badge
                variant={
                  userData?.user_status === "active" ? "default" : "destructive"
                }
                className="capitalize"
              >
                {userData?.user_status || "unknown"}
              </Badge>

              <Badge
                variant={userData?.emailVerified ? "default" : "outline"}
                className="gap-1"
              >
                <BadgeCheck className="h-3.5 w-3.5" />
                {userData?.emailVerified ? "Verified" : "Not Verified"}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">
              Joined on {formatDate(userData?.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Info */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Personal Information
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="mt-0.5 h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{userData?.name || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm text-muted-foreground">Email Address</p>
                <p className="font-medium">{userData?.email || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm text-muted-foreground">System Role</p>
                <p className="font-medium capitalize">
                  {userData?.user_role?.replaceAll("_", " ") || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm text-muted-foreground">Account Created</p>
                <p className="font-medium">{formatDate(userData?.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Role Based Info */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            {isAdmin
              ? "Admin Information"
              : isOrganizer
                ? "Organizer Information"
                : "Account Information"}
          </h2>

          {/* Admin Info */}
          {isAdmin && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <BriefcaseBusiness className="mt-0.5 h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Admin Name</p>
                  <p className="font-medium">
                    {userData?.admin?.admin_name || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Admin Email</p>
                  <p className="font-medium">
                    {userData?.admin?.admin_email || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Admin Role</p>
                  <p className="font-medium capitalize">
                    {userData?.admin?.admin_role?.replaceAll("_", " ") || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Contact Number
                  </p>
                  <p className="font-medium">
                    {userData?.admin?.contact_number || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Organizer Info */}
          {isOrganizer && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Organizer Name
                  </p>
                  <p className="font-medium">
                    {userData?.organizers?.user_name || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Organizer Email
                  </p>
                  <p className="font-medium">
                    {userData?.organizers?.user_email || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Contact Number
                  </p>
                  <p className="font-medium">
                    {userData?.organizers?.contact_number || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">
                    {userData?.organizers?.user_address || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Normal User Fallback */}
          {!isAdmin && !isOrganizer && (
            <div className="rounded-xl border border-dashed p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No additional role-specific information found
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
